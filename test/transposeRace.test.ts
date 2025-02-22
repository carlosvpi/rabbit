import {describe, expect, test} from '@jest/globals';
import { transposeRace } from '../src/transposeRace';
import { range } from '../src/range';
import { fromArray } from '../src/fromArray';
import { pipe } from '../src/pipe';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';
import { multicast } from '../src/multicast';

describe('transposeRace', () => {
  describe('synchronous mode', () => {
    test('should mix two generators until the first ends', () => {
      const result = transposeRace<string|number, any>(fromArray(['a', 'b', 'c']), range(0, 4))
      expect([...result]).toEqual([['a', 0], ['b', 1], ['c', 2]]);
    });
    test('should mix three generators until the first ends', () => {
      const result = transposeRace<string|number, any>(fromArray(['a', 'b', 'c']), range(0, 4), fromArray([1, 1, 2, 5, 7]))
      expect([...result]).toEqual([['a', 0, 1], ['b', 1, 1], ['c', 2, 2]]);
    });
    test('should pass down the `next` value to the two generators', () => {
      const gen = transposeRace<number>(feedMap((x: number) => x * 2, 0), feedMap((x: number) => x + 1, 0))
      const result = pipe<number[]>(
        feed(range(1, 10))
      )(gen)
      expect([...result]).toEqual([[0,1],[2,2],[4,3],[6,4],[8,5],[10,6],[12,7],[14,8],[16,9],[18,10]]);
    });
    test('should return the return value of all ended generators as soon as they are done', () => {
      const result = yieldReturnValue(transposeRace<number>(range(0, 5, 1, 100), range(0, 5, 1, 150), range(0, 8, 1, 200)))
      expect([...result]).toEqual([[0,0,0],[1,1,1],[2,2,2],[3,3,3],[4,4,4],[100,150,undefined]]);
    });
  });
  describe('asynchronous mode', () => {
    test('should mix two generators until the first ends', async () => {
      const result = transposeRace<string|number, any>(toAsync(fromArray(['a', 'b', 'c'])), toAsync(range(0, 4)))
      expect(await toArray(result)).toEqual([['a', 0], ['b', 1], ['c', 2]]);
    });
    test('should mix three generators until the first ends', async () => {
      const result = transposeRace<string|number, any>(toAsync(fromArray(['a', 'b', 'c'])), toAsync(range(0, 4)), toAsync(fromArray([1, 1, 2, 5, 7])))
      expect(await toArray(result)).toEqual([['a', 0, 1], ['b', 1, 1], ['c', 2, 2]]);
    });
    test('should pass down the `next` value to the two generators', async () => {
      const gen = transposeRace<number | string>(toAsync(feedMap((x: number) => x * 2, 0)), toAsync(feedMap((x: number) => x + 1, 0)))
      const result = pipe(
        feed(toAsync(range(1, 10)))
      )(gen)
      expect(await toArray(result)).toEqual([[0,1],[2,2],[4,3],[6,4],[8,5],[10,6],[12,7],[14,8],[16,9],[18,10]]);
    });
    test('should return the return value of all ended generators as soon as they are done', async () => {
      const result = yieldReturnValue(transposeRace<number | string>(toAsync(range(0, 5, 1, 100)), toAsync(range(0, 5, 1, 150)), toAsync(range(0, 8, 1, 200))))
      expect(await toArray(result)).toEqual([[0,0,0],[1,1,1],[2,2,2],[3,3,3],[4,4,4],[100,150,undefined]]);
    });
    test('should mix two asynchronous generators that are multicasts of an original one without reduplicating values', async () => {
      const multicasted = multicast(toAsync(fromArray([1,2,3,4])))
      const c1 = multicasted.next().value
      const c2 = multicasted.next().value
      const result = transposeRace(c1, c2)
      expect(await toArray(result)).toEqual([[1, 1], [2, 2], [3, 3], [4, 4]]);
    });
  });
});

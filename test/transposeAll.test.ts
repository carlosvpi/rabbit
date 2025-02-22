import {describe, expect, test} from '@jest/globals';
import { transposeAll } from '../src/transposeAll';
import { range } from '../src/range';
import { pipe } from '../src/pipe';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { fromArray } from '../src/fromArray';
import { toAsync } from '../src/toAsync';
import { multicast } from '../src/multicast';
import { map } from '../src/map';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('transposeAll', () => {
  describe('synchronous mode', () => {
    test('should mix two generators', () => {
      const result = transposeAll<number | string>(fromArray(['a', 'b', 'c']), range(0, 4))
      expect([...result]).toEqual([['a', 0], ['b', 1], ['c', 2], [undefined, 3]]);
    });
    test('should mix three generators', () => {
      const result = transposeAll<number | string>(fromArray(['a', 'b', 'c']), range(0, 4), fromArray([1, 1, 2, 5, 7]))
      expect([...result]).toEqual([['a', 0, 1], ['b', 1, 1], ['c', 2, 2], [undefined, 3, 5], [undefined, undefined, 7]]);
    });
    test('should pass down the `next` value to the two generators', () => {
      const gen = transposeAll<number>(feedMap((x: number) => x * 2, 0), feedMap((x: number) => x + 1, 0))
      const result = pipe<number[]>(
        feed(range(1, 10))
      )(gen)
      expect([...result]).toEqual([[0,1],[2,2],[4,3],[6,4],[8,5],[10,6],[12,7],[14,8],[16,9],[18,10]]);
    });
    test('should return the return value of each generator at the end', () => {
      const result = yieldReturnValue(transposeAll<number | string>(range(0, 5, 1, 100), range(0, 8, 1, 200)))
      expect([...result]).toEqual([[0,0],[1,1],[2,2],[3,3],[4,4],[undefined,5],[undefined,6],[undefined,7],[100,200]]);
    });
  });
  describe('asynchronous mode', () => {
    test('should mix two generators', async () => {
      const result = transposeAll<number | string>(toAsync(fromArray(['a', 'b', 'c'])), toAsync(range(0, 4)))
      expect(await toArray(result)).toEqual([['a', 0], ['b', 1], ['c', 2], [undefined, 3]]);
    });
    test('should mix three generators', async () => {
      const result = transposeAll<number | string>(toAsync(fromArray(['a', 'b', 'c'])), toAsync(range(0, 4)), toAsync(fromArray([1, 1, 2, 5, 7])))
      expect(await toArray(result)).toEqual([['a', 0, 1], ['b', 1, 1], ['c', 2, 2], [undefined, 3, 5], [undefined, undefined, 7]]);
    });
    test('should pass down the `next` value to the two generators', async () => {
      const gen = transposeAll<number>(toAsync(feedMap((x: number) => x * 2, 0)), toAsync(feedMap((x: number) => x + 1, 0)))
      const result = pipe<number[]>(
        feed(toAsync(range(1, 10))) as (_: AsyncGenerator<number[]>) => AsyncGenerator<number[]>
      )(gen)
      expect(await toArray(result)).toEqual([[0,1],[2,2],[4,3],[6,4],[8,5],[10,6],[12,7],[14,8],[16,9],[18,10]]);
    });
    test('should return the return value of each generator at the end', async () => {
      const result = yieldReturnValue(transposeAll<number | string>(toAsync(range(0, 5, 1, 100)), toAsync(range(0, 8, 1, 200))))
      expect(await toArray(result)).toEqual([[0,0],[1,1],[2,2],[3,3],[4,4],[undefined,5],[undefined,6],[undefined,7],[100,200]]);
    });
    test('should mix two asynchronous generators that are multicasts of an original one without reduplicating values', async () => {
      const multicasted = multicast(toAsync(fromArray([1,2,3,4])))
      const c1 = multicasted.next().value
      const c2 = multicasted.next().value
      const result = transposeAll(c1, c2)
      expect(await toArray(result)).toEqual([[1, 1], [2, 2], [3, 3], [4, 4]]);
    });
  });
});

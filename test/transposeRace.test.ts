import {describe, expect, test} from '@jest/globals';
import { transposeRace } from '../src/transposeRace';
import { range } from '../src/range';
import { fromArray } from '../src/fromArray';
import { pipe } from '../src/pipe';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('transposeRace', () => {
  test('should mix two generators until the first ends', () => {
    const result = transposeRace<string|number, any>(fromArray(['a', 'b', 'c']), range(0, 4))
    expect([...result]).toEqual([['a', 0], ['b', 1], ['c', 2]]);
  });
  test('should mix three generators until the first ends', () => {
    const result = transposeRace<string|number, any>(fromArray(['a', 'b', 'c']), range(0, 4), fromArray([1, 1, 2, 5, 7]))
    expect([...result]).toEqual([['a', 0, 1], ['b', 1, 1], ['c', 2, 2]]);
  });
  test('should pass down the `next` value to the two generators', () => {
    const gen = transposeRace<number | string>(feedMap((x: number) => x * 2, 0), feedMap((x: number) => x + 1, 0))
    const result = pipe(
      feed(range(1, 10))
    )(gen)
    expect([...result]).toEqual([[0,1],[2,2],[4,3],[6,4],[8,5],[10,6],[12,7],[14,8],[16,9],[18,10]]);
  });
  test('should return the return value of all ended generators as soon as they are done', () => {
    const result = yieldReturnValue(transposeRace<number | string>(range(0, 5, 1, 100), range(0, 5, 1, 150), range(0, 8, 1, 200)))
    expect([...result]).toEqual([[0,0,0],[1,1,1],[2,2,2],[3,3,3],[4,4,4],[100,150,undefined]]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { asyncTransposeRace } from '../src/asyncTransposeRace';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { fromArray } from '../src/fromArray';
import { asyncPipe } from '../src/asyncPipe';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncTransposeRace', () => {
  test('should mix two generators until the first ends', async () => {
    const result = asyncTransposeRace<string|number, any>(toAsync(fromArray(['a', 'b', 'c'])), toAsync(range(0, 4)))
    expect(await asyncToArray(result)).toEqual([['a', 0], ['b', 1], ['c', 2]]);
  });
  test('should mix three generators until the first ends', async () => {
    const result = asyncTransposeRace<string|number, any>(toAsync(fromArray(['a', 'b', 'c'])), toAsync(range(0, 4)), toAsync(fromArray([1, 1, 2, 5, 7])))
    expect(await asyncToArray(result)).toEqual([['a', 0, 1], ['b', 1, 1], ['c', 2, 2]]);
  });
  test('should pass down the `next` value to the two generators', async () => {
    const gen = asyncTransposeRace<number | string>(toAsync(feedMap((x: number) => x * 2, 0)), toAsync(feedMap((x: number) => x + 1, 0)))
    const result = asyncPipe(
      asyncFeed(toAsync(range(1, 10)))
    )(gen)
    expect(await asyncToArray(result)).toEqual([[0,1],[2,2],[4,3],[6,4],[8,5],[10,6],[12,7],[14,8],[16,9],[18,10]]);
  });
  test('should return the return value of all ended generators as soon as they are done', async () => {
    const result = asyncYieldReturnValue(asyncTransposeRace<number | string>(toAsync(range(0, 5, 1, 100)), toAsync(range(0, 5, 1, 150)), toAsync(range(0, 8, 1, 200))))
    expect(await asyncToArray(result)).toEqual([[0,0,0],[1,1,1],[2,2,2],[3,3,3],[4,4,4],[100,150,undefined]]);
  });
});
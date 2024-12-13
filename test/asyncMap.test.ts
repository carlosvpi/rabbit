import {describe, expect, test} from '@jest/globals';
import { asyncMap } from '../src/asyncMap';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncPipe } from '../src/asyncPipe';
import { asyncFeed } from '../src/asyncFeed';
import { asyncReturning } from '../src/asyncReturning';
import { feedMap } from '../src/feedMap';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncMap', () => {
  test('should double elements', async () => {
    const result = asyncMap((x: number) => x * 2)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
  test('should pass down the `next` elements', async () => {
    const result = asyncPipe(
      asyncFeed(toAsync(range(1, 10))),
      asyncMap<number, number>((x: number) => x + 1),
    )(toAsync(feedMap((x:number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
  });
  test('should take into account index and next', async () => {
    const result = asyncPipe(
      asyncMap<number, number>((x: number, i: number, n: number) => 2**x + 3**i + 5**(n ?? 0)),
      asyncFeed(toAsync(range(1, 10))),
    )(toAsync(feedMap((x:number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([3,12,50,216,962,4392,20450,96696,462722,2234952]);
  });
  test('should return the same as the original', async () => {
    const result = asyncPipe(
      asyncReturning(100),
      asyncMap<number, number>((x: number) => x * 2),
      asyncYieldReturnValue,
    )(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 100]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { asyncPick } from '../src/asyncPick';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncPipe } from '../src/asyncPipe';
import { feedMap } from '../src/feedMap';
import { asyncFeed } from '../src/asyncFeed';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncPick', () => {
  test('should asyncPick the ith element', async () => {
    const result = asyncPick([5, 0, 3, 6])(toAsync(range(0, Infinity, 2)))
    expect(await asyncToArray(result)).toEqual([10, 0, 6, 12]);
  });
  test('should pass down the `next` value to the ith element', async () => {
    const result = asyncPipe(
      asyncPick([1, 0, 7, 6]),
      asyncFeed(toAsync(range(1)))
    )(toAsync(feedMap((x: number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([NaN, 0, 4, 4]);
  });
  test('should give `undefined` where the generator had ended, but keep providing previous values', async () => {
    const result = asyncPick([5, 20, 6, 35, 2])(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([5, undefined, 6, undefined, 2]);
  });
  test('should return the returning value of the generator, if reached', async () => {
    const result = asyncYieldReturnValue(asyncPick([5, 20, 6, 35, 2])(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([5, undefined, 6, undefined, 2, 100]);
  });
  test('should not return anything if did not reach the end of the generator and no returnValue is specified', async () => {
    const result = asyncYieldReturnValue(asyncPick([5, 2, 6, 4, 2])(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([5, 2, 6, 4, 2, undefined]);
  });
  test('should return the specified return value if specified, when also reached the end of the generator', async () => {
    const result = asyncYieldReturnValue(asyncPick([5, 20, 6, 4, 2], 200)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([5, undefined, 6, 4, 2, 200]);
  });
  test('should return the specified return value if specified, even when did not reach the end of the generator', async () => {
    const result = asyncYieldReturnValue(asyncPick([5, 2, 6, 4, 2], 200)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([5, 2, 6, 4, 2, 200]);
  });
});
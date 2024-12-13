import {describe, expect, test} from '@jest/globals';
import { asyncDrop } from '../src/asyncDrop';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { feedMap } from '../src/feedMap';
import { asyncFeed } from '../src/asyncFeed';

describe('asyncDrop', () => {
  test('should not asyncDrop the if no number provided', async () => {
    const result = asyncDrop()(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should asyncDrop the first 5 elements', async () => {
    const result = asyncDrop(5)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([5, 6, 7, 8, 9]);
  });
  test('should asyncDrop the first 10 elements when `g` finishes at 5', async () => {
    const result = asyncDrop(10)(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([]);
  });
  test('should return the same as `g` if no return value specified', async () => {
    const result = asyncYieldReturnValue(asyncDrop(5)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([5, 6, 7, 8, 9, 100]);
  });
  test('should return the specified value even if `g` returns a value', async () => {
    const result = asyncYieldReturnValue(asyncDrop(5, 200)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([5, 6, 7, 8, 9, 200]);
  });
  test('should pass down the `next` value', async () => {
    const result = asyncFeed(toAsync(range(1, 10)))(asyncDrop(5)(toAsync(feedMap((x: number) => x * 2, 0))))
    expect(await asyncToArray(result)).toEqual([NaN, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
});
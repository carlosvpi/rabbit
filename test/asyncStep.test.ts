import {describe, expect, test} from '@jest/globals';
import { asyncStep } from '../src/asyncStep';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncStep', () => {
  test('should asyncStep 1 if no number provided', async () => {
    const result = asyncStep()(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should asyncStep 2 by 2 elements', async () => {
    const result = asyncStep(2)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8]);
  });
  test('should return the same as `g` if no return value specified', async () => {
    const result = asyncYieldReturnValue(asyncStep(2)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 100]);
  });
  test('should return the specified value even if `g` returns a value', async () => {
    const result = asyncYieldReturnValue(asyncStep(2, 200)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 200]);
  });
  test('should pass down the `next` value', async () => {
    const result = asyncFeed(toAsync(range(1, 10)))(asyncStep(5)(toAsync(feedMap((x: number) => x * 2, 0))))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
});
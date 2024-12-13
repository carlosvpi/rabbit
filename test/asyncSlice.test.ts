import {describe, expect, test} from '@jest/globals';
import { asyncSlice } from '../src/asyncSlice';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { feedMap } from '../src/feedMap';
import { asyncFeed } from '../src/asyncFeed';

describe('asyncSlice', () => {
  test('should asyncSlice from 0 onwards elements', async () => {
    const result = asyncSlice()(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should asyncSlice from 5 onwards elements', async () => {
    const result = asyncSlice(5)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([5, 6, 7, 8, 9]);
  });
  test('should asyncSlice from 0 to 5 elements', async () => {
    const result = asyncSlice(0, 5)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4]);
  });
  test('should asyncSlice from 1 to 9 stepping 2 elements', async () => {
    const result = asyncSlice(1, 9, 2)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([1, 3, 5, 7]);
  });
  test('should asyncSlice from 1 to 9 stepping 2 elements and return the returning value', async () => {
    const result = asyncYieldReturnValue(asyncSlice(1, 9, 2, 200)(toAsync(range(0, 10))))
    expect(await asyncToArray(result)).toEqual([1, 3, 5, 7, 200]);
  });
  test('should asyncSlice from 1 to 9 stepping 2 elements and return the returning value of the generator if not specified', async () => {
    const result = asyncYieldReturnValue(asyncSlice(0, Infinity, 1)(toAsync(range(1, 9, 2, 100))))
    expect(await asyncToArray(result)).toEqual([1, 3, 5, 7, 100]);
  });
  test('should asyncSlice from 1 to 9 stepping 2 elements and return the returning value even if the generator has a return value', async () => {
    const result = asyncYieldReturnValue(asyncSlice(1, 20, 2, 200)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([1, 3, 5, 7, 9, 200]);
  });
  test('should pass down the `next` value', async () => {
    const result = asyncFeed(toAsync(range()))(asyncSlice(1, 10)(toAsync(feedMap((x: number) => x * 2, 0))))
    expect(await asyncToArray(result)).toEqual([NaN, 0, 2, 4, 6, 8, 10, 12, 14]);
  });
});
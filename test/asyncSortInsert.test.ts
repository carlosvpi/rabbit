import {describe, expect, test} from '@jest/globals';
import { asyncSortInsert } from '../src/asyncSortInsert';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncSortInsert', () => {
  test('should insert in the beginning and return the return value of the generator if no return value specified', async () => {
    const result = asyncYieldReturnValue(asyncSortInsert(-1, (a, b) => a - b)(toAsync(range(0, 10, 2, 100))))
    expect(await asyncToArray(result)).toEqual([-1, 0, 2, 4, 6, 8, 100]);
  });
  test('should insert in the middle and return the return value of the generator if no return value specified', async () => {
    const result = asyncYieldReturnValue(asyncSortInsert(5, (a, b) => a - b)(toAsync(range(0, 10, 2, 100))))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 5, 6, 8, 100]);
  });
  test('should insert in the end and return the return value of the generator if no return value specified', async () => {
    const result = asyncYieldReturnValue(asyncSortInsert(9, (a, b) => a - b)(toAsync(range(0, 10, 2, 100))))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 9, 100]);
  });
  test('should pass down the `next` value, preserving the asyncFeed', async () => {
    const result = asyncFeed(toAsync(range(1, 10, 2)))(asyncSortInsert(9, (a, b) => a - b)(toAsync(feedMap((x: number) => x * 2, 0))))
    expect(await asyncToArray(result)).toEqual([0, 2, 6, 9, 10, 14]);
  });
});
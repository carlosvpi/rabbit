import {describe, expect, test} from '@jest/globals';
import { asyncChunks } from '../src/asyncChunks';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { asyncFeed } from '../src/asyncFeed';
import { asyncTake } from '../src/asyncTake';
import { feedMap } from '../src/feedMap';
import { asyncToArray } from '../src/asyncToArray';

describe('asyncChunks', () => {
  test('should get asyncChunks of three elements', async () => {
    const result = asyncChunks(3)(toAsync(range(0, 12)))
    expect(await asyncToArray(result)).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]]);
  });
  test('should get asyncChunks of three elements (the last chunk is not full if `g` ends abruptly)', async () => {
    const result = asyncChunks(3)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]);
  });
  test('should get asyncChunks of 1 element when no argument is passed', async () => {
    const result = asyncChunks()(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([[0], [1], [2], [3], [4]]);
  });
  test('should pass down the `next` value for every chunk', async () => {
    const result = asyncTake(4)(asyncFeed(toAsync(range(1)))(asyncChunks(3)(toAsync(feedMap((x: number) => x * 2, 0)))))
    expect(await asyncToArray(result)).toEqual([[0, NaN, NaN], [2, 2, 2], [4, 4, 4], [6, 6, 6]]);
  });
  test('should return the same as g', async () => {
    const result = asyncYieldReturnValue(asyncChunks(3)(toAsync(range(0, 5, 1, 100))))
    expect(await asyncToArray(result)).toEqual([[0, 1, 2], [3, 4], 100]);
  });
});
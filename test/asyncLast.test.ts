import {describe, expect, test} from '@jest/globals';
import { asyncLast } from '../src/asyncLast';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncFeed } from '../src/asyncFeed';
import { asyncTake } from '../src/asyncTake';
import { feedMap } from '../src/feedMap';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncLast', () => {
  test('should get asyncLast of three elements', async () => {
    const result = asyncLast(3)(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([[0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4]]);
  });
  test('should get asyncLast of 1 element when no argument is passed', async () => {
    const result = asyncLast()(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([[0], [1], [2], [3], [4]]);
  });
  test('should pass down the `next` value for every chunk', async () => {
    const result = asyncTake(4)(asyncFeed(toAsync(range(1)))(asyncLast(3)(toAsync(feedMap((x: number) => x * 2, 0)))))
    expect(await asyncToArray(result)).toEqual([[0], [0, 2], [0, 2, 4], [2, 4, 6]]);
  });
  test('should return the same as g', async () => {
    const result = asyncYieldReturnValue(asyncLast(3)(toAsync(range(0, 5, 1, 100))))
    expect(await asyncToArray(result)).toEqual([[0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4], 100]);
  });
});
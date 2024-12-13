import {describe, expect, test} from '@jest/globals';
import { asyncFlatMap } from '../src/asyncFlatMap';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncPipe } from '../src/asyncPipe';
import { feedMap } from '../src/feedMap';
import { asyncTake } from '../src/asyncTake';
import { asyncFeed } from '../src/asyncFeed';
import { asyncReturning } from '../src/asyncReturning';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncFlatMap', () => {
  test('should give numbers in ranges from 0 onwards', async () => {
    const result = asyncFlatMap((x: number) => toAsync(range(0, x)))(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([0, 0, 1, 0, 1, 2, 0, 1, 2, 3]);
  });
  test('should pass down the next values to the children', async () => {
    const result = asyncPipe(
      asyncFeed(toAsync(range(2, 10))),
      asyncFlatMap((x: number) => toAsync(range(0, x))),
      asyncTake<number>(16),
    )(toAsync(feedMap<number, number>((x: number) => x * 2, 1)))
    expect(await asyncToArray(result)).toEqual([0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3]);
  });
  test('should return the final return value followed by the children return values', async () => {
    const result = asyncPipe(
      asyncReturning<number>(1000),
      asyncFlatMap<number,number>((x: number, i: number) => asyncReturning<number>(i * 100)(toAsync(range(0, x)))),
      asyncYieldReturnValue,
    )(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([0, 0, 1, 0, 1, 2, 0, 1, 2, 3, [1000, 0, 100, 200, 300, 400]]);
  });
});
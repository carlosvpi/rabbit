import {describe, expect, test} from '@jest/globals';
import { asyncReturningMap } from '../src/asyncReturningMap';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncPipe } from '../src/asyncPipe';
import { asyncFeed } from '../src/asyncFeed';
import { asyncTake } from '../src/asyncTake';
import { feedMap } from '../src/feedMap';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncReturningMap', () => {
  test('should generate the same as a generator and return the correct value, when the generator returns', async () => {
    const result = asyncYieldReturnValue(asyncReturningMap(() => 200)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
  });
  test('should generate the same as a generator and return the correct value, when the generator does not return', async () => {
    const result = asyncYieldReturnValue(asyncReturningMap(() => 200)(toAsync(range(0, 10))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
  });
  test('should pass down the `next` values, and take into account the length and the `next` values', async () => {
    const result = asyncPipe(
      asyncTake(5, 10),
      asyncReturningMap((returnValue, index, next) => 2**returnValue + 3**index + 5**next),
      asyncFeed(toAsync(range(1))),
      asyncYieldReturnValue,
    )(toAsync(feedMap((x: number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, [4392, null]]);
  });
});
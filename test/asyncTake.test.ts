import {describe, expect, test} from '@jest/globals';
import { asyncTake } from '../src/asyncTake';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncReturning } from '../src/asyncReturning';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { asyncPipe } from '../src/asyncPipe';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncTake', () => {
  test('should get the first 5 elements', async () => {
    const result = asyncTake(5)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4]);
  });
  test('should return the return value of g if g runs out', async () => {
    const result = asyncPipe(
      asyncReturning(100),
      asyncTake(10),
      asyncYieldReturnValue,
    )(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should return the specified return value argument if g does not run out', async () => {
    const result = asyncYieldReturnValue(asyncTake(5, 100)(toAsync(range(0, 10))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should return the specified return value argument even if g runs out and has a return value', async () => {
    const result = asyncYieldReturnValue(asyncTake(5, 100)(toAsync(range(0, 10, 1, 200))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should pass the next value to the generator', async () => {
    const result = asyncPipe(
      asyncFeed<number>(toAsync(range(1))),
      asyncTake<number>(5, 100),
    )(toAsync(feedMap((x:number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8]);
  });
  test('should get the 1st element when no argument provided', async () => {
    const result = asyncTake()(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0]);
  });
});

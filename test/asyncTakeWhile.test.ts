import {describe, expect, test} from '@jest/globals';
import { asyncTakeWhile } from '../src/asyncTakeWhile';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncReturning } from '../src/asyncReturning';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { asyncPipe } from '../src/asyncPipe';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';

describe('asyncTakeWhile', () => {
  test('should get the first elements until one is no less than 5', async () => {
    const result = asyncTakeWhile((x: number) => x < 5)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4]);
  });
  test('should get the first elements until the index is === 5', async () => {
    const result = asyncTakeWhile((_: number, i: number) => i < 5)(toAsync(range(10, 20)))
    expect(await asyncToArray(result)).toEqual([10, 11, 12, 13, 14]);
  });
  test('should get the first elements until the `next` is === 5', async () => {
    const result = asyncPipe(
      asyncTakeWhile<number>((_1: number, _2: number, next: number) => !next || next < 10),
      asyncFeed<number>(toAsync(range(1))),
    )(toAsync(feedMap((x:number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
  test('should return the return value of g if g runs out', async () => {
    const result = asyncPipe(
      asyncReturning<number>(100),
      asyncTakeWhile((x: number) => x < 10),
      asyncYieldReturnValue,
    )(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should return the specified return value argument if g does not run out', async () => {
    const result = asyncYieldReturnValue(asyncTakeWhile((x: number) => x < 5, 100)(toAsync(range(0, 10))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should return the specified return value argument even if g does run out with its own return value', async () => {
    const result = asyncYieldReturnValue(asyncTakeWhile((x: number) => x < 5, 100)(toAsync(range(0, 10, 1, 200))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should pass the next value to the generator', async () => {
    const result = asyncPipe(
      asyncFeed<number>(toAsync(range(1))),
      asyncTakeWhile<number>((x: number) => x < 10, 100),
    )(toAsync(feedMap((x:number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8]);
  });
});
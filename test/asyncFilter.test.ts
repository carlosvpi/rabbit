import {describe, expect, test} from '@jest/globals';
import { asyncFilter } from '../src/asyncFilter';
import { range } from '../src/range';
import { feedMap } from '../src/feedMap';
import { asyncFeed } from '../src/asyncFeed';
import { asyncPipe } from '../src/asyncPipe';
import { asyncReturning } from '../src/asyncReturning';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { asyncTake } from '../src/asyncTake';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';

describe('asyncFilter', () => {
  test('should asyncFilter the odd elements', async () => {
    const result = asyncFilter((x: number) => x % 2 === 0)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8]);
  });
  test('should asyncFilter the odd elements, passing down the `next` value', async () => {
    const result = asyncPipe<number>(
      asyncFeed(toAsync(range(1, 10))),
      asyncFilter((x: number) => x % 2 === 0)
    )(toAsync(feedMap<number, number>((x: number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
  test('should asyncFilter taking into account the index of the element emitted', async () => {
    const result = asyncPipe<number>(
      asyncFilter((_: number, index: number) => index % 4 < 2)
    )(toAsync(range(0, 16)))
    expect(await asyncToArray(result)).toEqual([0, 1, 4, 5, 8, 9, 12, 13]);
  });
  test('should return the same value as the generator', async () => {
    const result = asyncPipe<number>(
      asyncTake(10),
      asyncFeed(toAsync(range(1, 10))),
      asyncFilter((x: number) => x % 2 === 0),
      asyncReturning(101),
      asyncYieldReturnValue,
    )(toAsync(feedMap<number, number>((x: number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 101]);
  });
});
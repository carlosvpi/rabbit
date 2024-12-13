import {describe, expect, test} from '@jest/globals';
import { asyncFeed } from '../src/asyncFeed';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncTake } from '../src/asyncTake';
import { asyncReturning } from '../src/asyncReturning';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { feedMap } from '../src/feedMap';
import { asyncPipe } from '../src/asyncPipe';
import { asyncToArray } from '../src/asyncToArray';

describe('asyncFeed', () => {
  test('should double the input of the feeder', async () => {
    const result = asyncPipe(
      asyncFeed(toAsync(range(9, -1)))
    )(toAsync(feedMap(x => 2 * x, 10)))
    expect(await asyncToArray(result)).toEqual([20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0]);
  });
  test('should return [v, null] if the generator ends first with v', async () => {
    const gen = asyncPipe(
      asyncTake(4),
      asyncReturning(100)
    )(toAsync(feedMap(x => 2 * x, 10)))
    const result = asyncPipe(
      asyncFeed(toAsync(range(9, -1))),
      asyncYieldReturnValue
    )(gen)
    expect(await asyncToArray(result)).toEqual([20, 18, 16, 14, [100, null]]);
  });
  test('should return [null, v] if the feeder ends first with v', async () => {
    const feeder = asyncPipe(
      asyncTake(4),
      asyncReturning(200)
    )(toAsync(range(9, -1)))
    const result = asyncPipe(
      asyncFeed(feeder),
      asyncYieldReturnValue
    )(toAsync(feedMap(x => 2 * x, 10)))
    expect(await asyncToArray(result)).toEqual([20, 18, 16, 14, 12, [null, 200]]);
  });
  test('should return [v, w] if the generator ends in v and the feeder with w', async () => {
    const gen = asyncPipe(
      asyncTake(4),
      asyncReturning(100)
    )(toAsync(feedMap(x => 2 * x, 10)))
    const feeder = asyncPipe(
      asyncTake(4),
      asyncReturning(200)
    )(toAsync(range(9, -1)))
    const result = asyncPipe(
      asyncFeed(feeder),
      asyncYieldReturnValue
    )(gen)
    expect(await asyncToArray(result)).toEqual([20, 18, 16, 14, [100, 200]]);
  });
});
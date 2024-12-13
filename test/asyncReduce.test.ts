import {describe, expect, test} from '@jest/globals';
import { asyncReduce } from '../src/asyncReduce';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { asyncTake } from '../src/asyncTake';
import { asyncPipe } from '../src/asyncPipe';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncReduce', () => {
  test('should add up the elements of a generator', async () => {
    const result = asyncReduce((acc: number, x: number) => acc + x, 100)(toAsync(range(0, 10)))
    expect(await asyncToArray(result)).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145]);
  });
  test('should return the return value of the generator', async () => {
    const result = asyncYieldReturnValue(asyncReduce((acc: number, x: number) => acc + x, 100)(toAsync(range(0, 10, 1, 200))))
    expect(await asyncToArray(result)).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145, 200]);
  });
  test('should pass down the `next` value and add up the elements of a generator', async () => {
    const result = asyncPipe(
      asyncReduce((acc: number, x: number) => acc + x, 100),
      asyncFeed(toAsync(range(1))),
      asyncTake(10)
    )(toAsync(feedMap((x: number) => x * 2, 0)))
    expect(await asyncToArray(result)).toEqual([100, 102, 106, 112, 120, 130, 142, 156, 172, 190]);
  });
});
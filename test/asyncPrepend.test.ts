import {describe, expect, test} from '@jest/globals';
import { asyncPrepend } from '../src/asyncPrepend';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncTake } from '../src/asyncTake';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncPrepend', () => {
  test('should asyncPrepend 5 elements to our generator', async () => {
    const result = asyncPrepend(toAsync(range(0, 5)))(toAsync(range(5, 10)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should asyncPrepend 5 elements to our generator, passing down the "next" values introduced', async () => {
    const fed = asyncTake<number>(5)(toAsync(feedMap<number, number>((x:number) => 100 - x, 0)))
    const appended = asyncPrepend<number>(fed)(toAsync(feedMap<number, number>((x:number) => x, 5)))
    const result = asyncFeed(toAsync(range(1, 10)))(appended)
    expect(await asyncToArray(result)).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9]);
  });
  test('should return the return value of the appended generator', async () => {
    const result = asyncYieldReturnValue(asyncPrepend<number>(toAsync(range(100, 95)))(toAsync(range(5, 10, 1, 0))))
    expect(await asyncToArray(result)).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9, 0]);
  });
});
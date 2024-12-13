import {describe, expect, test} from '@jest/globals';
import { asyncAppend } from '../src/asyncAppend';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { toAsync } from '../src/toAsync';
import { range } from '../src/range';
import { asyncTake } from '../src/asyncTake';
import { asyncToArray } from '../src/asyncToArray';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncAppend', () => {
  test('should asyncAppend 5 elements to our generator', async () => {
    const result = asyncAppend(toAsync(range(5, 10)))(toAsync(range(0, 5)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should asyncAppend 5 elements to our generator, passing down the "next" values introduced', async () => {
    const fed = asyncTake<number>(5)(toAsync(feedMap<number, number>((x:number) => 100 - x, 0)))
    const appended = asyncAppend<number>(toAsync(feedMap<number, number>((x:number) => x, 5)))(fed)
    const result = asyncFeed(toAsync(range(1, 10)))(appended)
    expect(await asyncToArray(result)).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9]);
  });
  test('should return the return value of the appended generator', async () => {
    const result = asyncYieldReturnValue(asyncAppend<number>(toAsync(range(5, 10, 1, 0)))(toAsync(range(100, 95))))
    expect(await asyncToArray(result)).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9, 0]);
  });
});
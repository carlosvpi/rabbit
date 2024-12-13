import {describe, expect, test} from '@jest/globals';
import { asyncEvery } from '../src/asyncEvery';
import { range } from '../src/range';
import { feedMap } from '../src/feedMap';
import { asyncFeed } from '../src/asyncFeed';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { fromArray } from '../src/fromArray';
import { asyncToArray } from '../src/asyncToArray';
import { toAsync } from '../src/toAsync';

describe('asyncEvery', () => {
  test('should generate 3 trues and 1 false, when a value is found', async () => {
    const result = asyncEvery((x: number) => x % 2 !== 0)(toAsync(fromArray([1, 3, 5, 6, 8, 10])))
    expect(await asyncToArray(result)).toEqual([true, true, true, false]);
  });
  test('should generate 5 trues when no value is found', async () => {
    const result = asyncEvery((x: number) => x % 2 !== 0)(toAsync(fromArray([1, 3, 5, 7, 9])))
    expect(await asyncToArray(result)).toEqual([true, true, true, true, true]);
  });
  test('should generate 4 trues and a false, passing down the `next` value', async () => {
    const result = asyncFeed(toAsync(range(1, 10)))(asyncEvery((x: number) => x <= 7)(toAsync(feedMap((x: number) => x * 2, 0))))
    expect(await asyncToArray(result)).toEqual([true, true, true, true, false]);
  });
  test('should return the element that fulfils the predicate', async () => {
    const result = asyncYieldReturnValue(asyncEvery((x: number) => x % 2 !== 0)(toAsync(fromArray([1, 3, 5, 6, 9], 100))))
    expect(await asyncToArray(result)).toEqual([true, true, true, false, 6]);
  });
  test('should return null if no event fulfils the predicate, irrespective of the return value of g', async () => {
    const result = asyncYieldReturnValue(asyncEvery((x: number) => x % 2 !== 0)(toAsync(fromArray([1, 3, 5, 7, 9], 100))))
    expect(await asyncToArray(result)).toEqual([true, true, true, true, true, 100]);
  });
  test('should take into account the index and next of the element emitted', async () => {
    const result = asyncFeed(toAsync(range(11, 20)))(asyncEvery((x: number, i: number, n: number) => x !== 36 || i !== 8 || n !== 18)(toAsync(feedMap((x: number) => x * 2, 10))))
    expect(await asyncToArray(result)).toEqual([true, true, true, true, true, true, true, true, false]);
  });
});
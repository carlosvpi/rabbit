import {describe, expect, test} from '@jest/globals';
import { asyncSome } from '../src/asyncSome';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { feedMap } from '../src/feedMap';
import { asyncFeed } from '../src/asyncFeed';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { fromArray } from '../src/fromArray';

describe('asyncSome', () => {
  test('should generate 3 falses and 1 true, when a value is found', async () => {
    const result = asyncSome((x: number) => x % 2 === 0)(toAsync(fromArray([1, 3, 5, 6, 8, 10])))
    expect(await asyncToArray(result)).toEqual([false, false, false, true]);
  });
  test('should generate 5 falses when no value is found', async () => {
    const result = asyncSome((x: number) => x % 2 === 0)(toAsync(fromArray([1, 3, 5, 7, 9])))
    expect(await asyncToArray(result)).toEqual([false, false, false, false, false]);
  });
  test('should generate 4 falses and a true, passing down the `next` value', async () => {
    const result = asyncFeed(toAsync(range(1, 10)))(asyncSome((x: number) => x > 7)(toAsync(feedMap((x: number) => x * 2, 0))))
    expect(await asyncToArray(result)).toEqual([false, false, false, false, true]);
  });
  test('should return the element that fulfils the predicate', async () => {
    const result = asyncYieldReturnValue(asyncSome((x: number) => x % 2 === 0)(toAsync(fromArray([1, 3, 5, 6, 9], 100))))
    expect(await asyncToArray(result)).toEqual([false, false, false, true, 6]);
  });
  test('should return null if no event fulfils the predicate, irrespective of the return value of g', async () => {
    const result = asyncYieldReturnValue(asyncSome((x: number) => x % 2 === 0)(toAsync(fromArray([1, 3, 5, 7, 9], 100))))
    expect(await asyncToArray(result)).toEqual([false, false, false, false, false, 100]);
  });
  test('should take into account the index and next of the element emitted', async () => {
    const result = asyncFeed(toAsync(range(11, 20)))(asyncSome((x: number, i: number, n: number) => x === 36 && i === 8 && n === 18)(toAsync(feedMap((x: number) => x * 2, 10))))
    expect(await asyncToArray(result)).toEqual([false, false, false, false, false, false, false, false, true]);
  });
});
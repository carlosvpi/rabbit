import {describe, expect, test} from '@jest/globals';
import { some } from '../src/some';
import { range } from '../src/range';
import { feedMap } from '../src/feedMap';
import { feed } from '../src/feed';
import { fromArray } from '../src/fromArray';
import { toArray } from '../src/toArray';
import { toAsync } from '../src/toAsync';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('some', () => {
  describe('synchronous mode', () => {
    test('should generate 3 falses and 1 true, when a value is found', () => {
      const result = some((x: number) => x % 2 === 0)(fromArray([1, 3, 5, 6, 8, 10]))
      expect([...result]).toEqual([false, false, false, true]);
    });
    test('should generate 5 falses when no value is found', () => {
      const result = some((x: number) => x % 2 === 0)(fromArray([1, 3, 5, 7, 9]))
      expect([...result]).toEqual([false, false, false, false, false]);
    });
    test('should generate 4 falses and a true, passing down the `next` value', () => {
      const result = feed(range(1, 10))(some((x: number) => x > 7)(feedMap((x: number) => x * 2, 0)))
      expect([...result]).toEqual([false, false, false, false, true]);
    });
    test('should return the element that fulfils the predicate', () => {
      const result = yieldReturnValue(some((x: number) => x % 2 === 0)(fromArray([1, 3, 5, 6, 9], 100)))
      expect([...result]).toEqual([false, false, false, true, 6]);
    });
    test('should return null if no event fulfils the predicate, irrespective of the return value of g', () => {
      const result = yieldReturnValue(some((x: number) => x % 2 === 0)(fromArray([1, 3, 5, 7, 9], 100)))
      expect([...result]).toEqual([false, false, false, false, false, 100]);
    });
    test('should take into account the index and next of the element emitted', () => {
      const result = feed(range(11, 20))(some((x: number, i: number, n: number) => x === 36 && i === 8 && n === 18)(feedMap((x: number) => x * 2, 10)))
      expect([...result]).toEqual([false, false, false, false, false, false, false, false, true]);
    });
  });
  describe('asynchronous mode', () => {
    test('should generate 3 falses and 1 true, when a value is found', async () => {
      const result = some((x: number) => x % 2 === 0)(toAsync(fromArray([1, 3, 5, 6, 8, 10])))
      expect(await toArray(result)).toEqual([false, false, false, true]);
    });
    test('should generate 5 falses when no value is found', async () => {
      const result = some((x: number) => x % 2 === 0)(toAsync(fromArray([1, 3, 5, 7, 9])))
      expect(await toArray(result)).toEqual([false, false, false, false, false]);
    });
    test('should generate 4 falses and a true, passing down the `next` value', async () => {
      const result = feed(toAsync(range(1, 10)))(some((x: number) => x > 7)(toAsync(feedMap((x: number) => x * 2, 0))))
      expect(await toArray(result)).toEqual([false, false, false, false, true]);
    });
    test('should return the element that fulfils the predicate', async () => {
      const result = yieldReturnValue(some((x: number) => x % 2 === 0)(toAsync(fromArray([1, 3, 5, 6, 9], 100))))
      expect(await toArray(result)).toEqual([false, false, false, true, 6]);
    });
    test('should return null if no event fulfils the predicate, irrespective of the return value of g', async () => {
      const result = yieldReturnValue(some((x: number) => x % 2 === 0)(toAsync(fromArray([1, 3, 5, 7, 9], 100))))
      expect(await toArray(result)).toEqual([false, false, false, false, false, 100]);
    });
    test('should take into account the index and next of the element emitted', async () => {
      const result = feed(toAsync(range(11, 20)))(some((x: number, i: number, n: number) => x === 36 && i === 8 && n === 18)(toAsync(feedMap((x: number) => x * 2, 10))))
      expect(await toArray(result)).toEqual([false, false, false, false, false, false, false, false, true]);
    });
  });
});
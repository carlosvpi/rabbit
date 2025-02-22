import {describe, expect, test} from '@jest/globals';
import { dropWhile } from '../src/dropWhile';
import { range } from '../src/range';
import { feedMap } from '../src/feedMap';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { feed } from '../src/feed';

describe('dropWhile', () => {
  describe('synchronous mode', () => {
    test('should drop while the element is < 5', () => {
      const result = dropWhile((x: number) => x < 5)(range(0, 10))
      expect([...result]).toEqual([5, 6, 7, 8, 9]);
    });
    test('should drop while the element is < 10 when `g` finishes at 5', () => {
      const result = dropWhile((x: number) => x < 10)(range(0, 5))
      expect([...result]).toEqual([]);
    });
    test('should return the same as `g` if no return value specified', () => {
      const result = yieldReturnValue(dropWhile((x: number) => x < 5)(range(0, 10, 1, 100)))
      expect([...result]).toEqual([5, 6, 7, 8, 9, 100]);
    });
    test('should return the specified value even if `g` returns a value', () => {
      const result = yieldReturnValue(dropWhile((x: number) => x < 5, 200)(range(0, 10, 1, 100)))
      expect([...result]).toEqual([5, 6, 7, 8, 9, 200]);
    });
    test('should take into account the index', () => {
      const result = dropWhile((x: number, i: number) => x > i)(range(10, 0))
      expect([...result]).toEqual([5, 4, 3, 2, 1]);
    });
    test('should pass down the `next` value', () => {
      const result = feed(range(1, 10))(dropWhile((x: number) => x < 5)(feedMap((x: number) => x * 2, 0)))
      expect([...result]).toEqual([NaN, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
    });
  });
  describe('asynchronous mode', () => {
    test('should drop while the element is < 5', async () => {
      const result = dropWhile((x: number) => x < 5)(toAsync(range(0, 10)))
      expect(await toArray(result)).toEqual([5, 6, 7, 8, 9]);
    });
    test('should drop while the element is < 10 when `g` finishes at 5', async () => {
      const result = dropWhile((x: number) => x < 10)(toAsync(range(0, 5)))
      expect(await toArray(result)).toEqual([]);
    });
    test('should return the same as `g` if no return value specified', async () => {
      const result = yieldReturnValue(dropWhile((x: number) => x < 5)(toAsync(range(0, 10, 1, 100))))
      expect(await toArray(result)).toEqual([5, 6, 7, 8, 9, 100]);
    });
    test('should return the specified value even if `g` returns a value', async () => {
      const result = yieldReturnValue(dropWhile((x: number) => x < 5, 200)(toAsync(range(0, 10, 1, 100))))
      expect(await toArray(result)).toEqual([5, 6, 7, 8, 9, 200]);
    });
    test('should take into account the index', async () => {
      const result = dropWhile((x: number, i: number) => x > i)(toAsync(range(10, 0)))
      expect(await toArray(result)).toEqual([5, 4, 3, 2, 1]);
    });
    test('should pass down the `next` value', async () => {
      const result = feed(toAsync(range(1, 10)))(dropWhile((x: number) => x < 5)(toAsync(feedMap((x: number) => x * 2, 0))))
      expect(await toArray(result)).toEqual([NaN, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
    });
  });
});
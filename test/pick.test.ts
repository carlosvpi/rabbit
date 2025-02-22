import {describe, expect, test} from '@jest/globals';
import { pick } from '../src/pick';
import { range } from '../src/range';
import { feedMap } from '../src/feedMap';
import { feed } from '../src/feed';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';
import { pipe } from '../src/pipe';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('pick', () => {
  describe('synchronous mode', () => {
    test('should pick the ith element', () => {
      const result = pick([5, 0, 3, 6])(range(0, Infinity, 2))
      expect([...result]).toEqual([10, 0, 6, 12]);
    });
    test('should pass down the `next` value to the ith element', () => {
      const result = pipe<number>(
        pick([1, 0, 7, 6]),
        feed(range(1))
      )(feedMap((x: number) => x * 2, 0))
      expect([...result]).toEqual([NaN, 0, 4, 4]);
    });
    test('should give `undefined` where the generator had ended, but keep providing previous values', () => {
      const result = pick([5, 20, 6, 35, 2])(range(0, 10))
      expect([...result]).toEqual([5, undefined, 6, undefined, 2]);
    });
    test('should return the returning value of the generator, if reached', () => {
      const result = yieldReturnValue(pick([5, 20, 6, 35, 2])(range(0, 10, 1, 100)))
      expect([...result]).toEqual([5, undefined, 6, undefined, 2, 100]);
    });
    test('should not return anything if did not reach the end of the generator and no returnValue is specified', () => {
      const result = yieldReturnValue(pick([5, 2, 6, 4, 2])(range(0, 10, 1, 100)))
      expect([...result]).toEqual([5, 2, 6, 4, 2, undefined]);
    });
    test('should return the specified return value if specified, when also reached the end of the generator', () => {
      const result = yieldReturnValue(pick([5, 20, 6, 4, 2], 200)(range(0, 10, 1, 100)))
      expect([...result]).toEqual([5, undefined, 6, 4, 2, 200]);
    });
    test('should return the specified return value if specified, even when did not reach the end of the generator', () => {
      const result = yieldReturnValue(pick([5, 2, 6, 4, 2], 200)(range(0, 10, 1, 100)))
      expect([...result]).toEqual([5, 2, 6, 4, 2, 200]);
    });
  });
  describe('asynchronous mode', () => {
    test('should pick the ith element', async () => {
      const result = pick([5, 0, 3, 6])(toAsync(range(0, Infinity, 2)))
      expect(await toArray(result)).toEqual([10, 0, 6, 12]);
    });
    test('should pass down the `next` value to the ith element', async () => {
      const result = pipe(
        pick([1, 0, 7, 6]),
        feed(toAsync(range(1)))
      )(toAsync(feedMap((x: number) => x * 2, 0)))
      expect(await toArray(result)).toEqual([NaN, 0, 4, 4]);
    });
    test('should give `undefined` where the generator had ended, but keep providing previous values', async () => {
      const result = pick([5, 20, 6, 35, 2])(toAsync(range(0, 10)))
      expect(await toArray(result)).toEqual([5, undefined, 6, undefined, 2]);
    });
    test('should return the returning value of the generator, if reached', async () => {
      const result = yieldReturnValue(pick([5, 20, 6, 35, 2])(toAsync(range(0, 10, 1, 100))))
      expect(await toArray(result)).toEqual([5, undefined, 6, undefined, 2, 100]);
    });
    test('should not return anything if did not reach the end of the generator and no returnValue is specified', async () => {
      const result = yieldReturnValue(pick([5, 2, 6, 4, 2])(toAsync(range(0, 10, 1, 100))))
      expect(await toArray(result)).toEqual([5, 2, 6, 4, 2, undefined]);
    });
    test('should return the specified return value if specified, when also reached the end of the generator', async () => {
      const result = yieldReturnValue(pick([5, 20, 6, 4, 2], 200)(toAsync(range(0, 10, 1, 100))))
      expect(await toArray(result)).toEqual([5, undefined, 6, 4, 2, 200]);
    });
    test('should return the specified return value if specified, even when did not reach the end of the generator', async () => {
      const result = yieldReturnValue(pick([5, 2, 6, 4, 2], 200)(toAsync(range(0, 10, 1, 100))))
      expect(await toArray(result)).toEqual([5, 2, 6, 4, 2, 200]);
    });
  });
});
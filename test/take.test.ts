import {describe, expect, test} from '@jest/globals';
import { take } from '../src/take';
import { range } from '../src/range';
import { returning } from '../src/returning';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { pipe } from '../src/pipe';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('take', () => {
  describe('synchronous mode', () => {
    test('should get the first 5 elements', () => {
      const result = take(5)(range(0, 10))
      expect([...result]).toEqual([0, 1, 2, 3, 4]);
    });
    test('should return the return value of g if g runs out', () => {
      const result = pipe<number>(
        returning(100),
        take(10),
        yieldReturnValue,
      )(range(0, 5))
      expect([...result]).toEqual([0, 1, 2, 3, 4, 100]);
    });
    test('should return the specified return value argument if g does not run out', () => {
      const result = yieldReturnValue(take(5, 100)(range(0, 10)))
      expect([...result]).toEqual([0, 1, 2, 3, 4, 100]);
    });
    test('should return the specified return value argument even if g runs out and has a return value', () => {
      const result = yieldReturnValue(take(5, 100)(range(0, 10, 1, 200)))
      expect([...result]).toEqual([0, 1, 2, 3, 4, 100]);
    });
    test('should pass the next value to the generator', () => {
      const result = pipe(
        feed<number>(range(1)),
        take<number>(5, 100),
      )(feedMap((x:number) => x * 2, 0))
      expect([...result]).toEqual([0, 2, 4, 6, 8]);
    });
    test('should get the 1st element when no argument provided', () => {
      const result = take()(range(0, 10))
      expect([...result]).toEqual([0]);
    });
  });
  describe('asynchronous mode', () => {
    test('should get the first 5 elements', async () => {
      const result = take(5)(toAsync(range(0, 10)))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4]);
    });
    test('should return the return value of g if g runs out', async () => {
      const result = pipe(
        returning(100),
        take(10),
        yieldReturnValue,
      )(toAsync(range(0, 5)))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
    });
    test('should return the specified return value argument if g does not run out', async () => {
      const result = yieldReturnValue(take(5, 100)(toAsync(range(0, 10))))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
    });
    test('should return the specified return value argument even if g runs out and has a return value', async () => {
      const result = yieldReturnValue(take(5, 100)(toAsync(range(0, 10, 1, 200))))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
    });
    test('should pass the next value to the generator', async () => {
      const result = pipe(
        feed<number>(toAsync(range(1))),
        take<number>(5, 100),
      )(toAsync(feedMap((x:number) => x * 2, 0)))
      expect(await toArray(result)).toEqual([0, 2, 4, 6, 8]);
    });
    test('should get the 1st element when no argument provided', async () => {
      const result = take()(toAsync(range(0, 10)))
      expect(await toArray(result)).toEqual([0]);
    });
  });
});
  
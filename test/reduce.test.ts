import {describe, expect, test} from '@jest/globals';
import { reduce } from '../src/reduce';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { pipe } from '../src/pipe';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toAsync } from '../src/toAsync';
import { take } from '../src/take';

describe('reduce', () => {
  describe('synchronous mode', () => {
    test('should add up the elements of a generator', () => {
      const result = reduce((acc: number, x: number) => acc + x, 100)(range(0, 10))
      expect([...result]).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145]);
    });
    test('should return the return value of the generator', () => {
      const result = yieldReturnValue(reduce((acc: number, x: number) => acc + x, 100)(range(0, 10, 1, 200)))
      expect([...result]).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145, 200]);
    });
    test('should pass down the `next` value and add up the elements of a generator', () => {
      const result = pipe<number>(
        reduce((acc: number, x: number) => acc + x, 100),
        feed(range(1)),
        take(10)
      )(feedMap((x: number) => x * 2, 0) as Generator<number>)
      expect([...result]).toEqual([100, 102, 106, 112, 120, 130, 142, 156, 172, 190]);
    });
  });
  describe('asynchronous mode', () => {
    test('should add up the elements of a generator', async () => {
      const result = reduce((acc: number, x: number) => acc + x, 100)(toAsync(range(0, 10)))
      expect(await toArray(result)).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145]);
    });
    test('should return the return value of the generator', async () => {
      const result = yieldReturnValue(reduce((acc: number, x: number) => acc + x, 100)(toAsync(range(0, 10, 1, 200))))
      expect(await toArray(result)).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145, 200]);
    });
    test('should pass down the `next` value and add up the elements of a generator', async () => {
      const result = pipe(
        reduce((acc: number, x: number) => acc + x, 100) as (g: AsyncGenerator<number>) => AsyncGenerator<number>,
        feed(toAsync(range(1))),
        take(10)
      )(toAsync(feedMap((x: number) => x * 2, 0)))
      expect(await toArray(result)).toEqual([100, 102, 106, 112, 120, 130, 142, 156, 172, 190]);
    });
  });
});

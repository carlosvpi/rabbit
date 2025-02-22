import {describe, expect, test} from '@jest/globals';
import { filter } from '../src/filter';
import { range } from '../src/range';
import { feedMap } from '../src/feedMap';
import { feed } from '../src/feed';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { returning } from '../src/returning';
import { pipe } from '../src/pipe';
import { take } from '../src/take';
import { AsyncOp } from '../src/types';

describe('filter', () => {
  describe('synchronous mode', () => {
    test('should filter the odd elements', () => {
      const result = filter((x: number) => x % 2 === 0)(range(0, 10))
      expect([...result]).toEqual([0, 2, 4, 6, 8]);
    });
    test('should filter the odd elements, passing down the `next` value', () => {
      const result = pipe<number>(
        feed(range(1, 10)),
        filter((x: number) => x % 2 === 0)
      )(feedMap<number, number>((x: number) => x * 2, 0))
      expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
    });
    test('should filter taking into account the index of the element emitted', () => {
      const result = pipe<number>(
        filter((_: number, index: number) => index % 4 < 2)
      )(range(0, 16))
      expect([...result]).toEqual([0, 1, 4, 5, 8, 9, 12, 13]);
    });
    test('should return the same value as the generator', () => {
      const result = pipe<number>(
        take(10),
        feed(range(1, 10)),
        filter((x: number) => x % 2 === 0),
        returning(101),
        yieldReturnValue,
      )(feedMap<number, number>((x: number) => x * 2, 0))
      expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 101]);
    });
  });
  describe('asynchronous mode', () => {
    test('should filter the odd elements', async () => {
      const result = filter((x: number) => x % 2 === 0)(toAsync(range(0, 10)))
      expect(await toArray(result)).toEqual([0, 2, 4, 6, 8]);
    });
    test('should filter the odd elements, passing down the `next` value', async () => {
      const result = pipe<number>(
        feed(toAsync(range(1, 10))) as AsyncOp,
        filter((x: number) => x % 2 === 0)
      )(toAsync(feedMap<number, number>((x: number) => x * 2, 0)))
      expect(await toArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
    });
    test('should filter taking into account the index of the element emitted', async () => {
      const result = pipe<number>(
        filter((_: number, index: number) => index % 4 < 2) as AsyncOp
      )(toAsync(range(0, 16)))
      expect(await toArray(result)).toEqual([0, 1, 4, 5, 8, 9, 12, 13]);
    });
    test('should return the same value as the generator', async () => {
      const result = pipe<number>(
        take(10),
        feed(toAsync(range(1, 10))) as AsyncOp,
        filter((x: number) => x % 2 === 0),
        returning(101),
        yieldReturnValue,
      )(toAsync(feedMap<number, number>((x: number) => x * 2, 0)))
      expect(await toArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 101]);
    });
  });
});

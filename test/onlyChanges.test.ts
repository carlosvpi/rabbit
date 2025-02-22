import {describe, expect, test} from '@jest/globals';
import { changesOnly } from '../src/changesOnly';
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
import { fromArray } from '../src/fromArray';

const diff = (a: number, b: number) => a - b

describe('changesOnly', () => {
  describe('synchronous mode', () => {
    test('should changesOnly elements', () => {
      const result = changesOnly(diff)(fromArray([1, 2, 1, 1, 2, 2, 1, 2, 3]))
      expect([...result]).toEqual([1, 2, 1, 2, 1, 2, 3]);
    });
    test('should pass the `next` value', () => {
      const result = feed(fromArray([1, 2, 1, 1, 2, 2, 1, 2, 3]))(changesOnly(diff)(feedMap((x: number, i: number) => x + i, 0)))
      expect([...result]).toEqual([0, 2, 4, 5, 6, 8, 9, 10, 12, 14]);
    });
    test('should return the same value as the generator', () => {
      const result = pipe<number>(
        take(10),
        feed(range(1, 10)),
        changesOnly(diff),
        returning(101),
        yieldReturnValue,
      )(feedMap<number, number>((x: number) => x * 2, 0))
      expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 101]);
    });
  });
  describe('asynchronous mode', () => {
    test('should changesOnly elements', async () => {
      const result = changesOnly(diff)(toAsync(fromArray([1, 2, 1, 1, 2, 2, 1, 2, 3])))
      expect(await toArray(result)).toEqual([1, 2, 1, 2, 1, 2, 3]);
    });
    test('should pass the `next` value', async () => {
      const result = feed(toAsync(fromArray([1, 2, 1, 1, 2, 2, 1, 2, 3])))(changesOnly(diff)(toAsync(feedMap((x: number, i: number) => x + i, 0))))
      expect(await toArray(result)).toEqual([0, 2, 4, 5, 6, 8, 9, 10, 12, 14]);
    });
    test('should return the same value as the generator', async () => {
      const result = pipe<number>(
        take(10) as AsyncOp,
        feed(toAsync(range(1, 10))),
        changesOnly(diff),
        returning(101),
        yieldReturnValue,
      )(toAsync(feedMap<number, number>((x: number) => x * 2, 0)))
      expect(await toArray(result)).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 101]);
    });
  });
});

import {describe, expect, test} from '@jest/globals';
import { feed } from '../src/feed';
import { range } from '../src/range';
import { take } from '../src/take';
import { returning } from '../src/returning';
import { feedMap } from '../src/feedMap';
import { pipe } from '../src/pipe';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('feed', () => {
  describe('synchronous mode', () => {
    test('should double the input of the feeder', () => {
      const result = pipe(
        feed(range(9, -1)) as (_: Generator<number>) => Generator<number>
      )(feedMap(x => 2 * x, 10))
      expect([...result]).toEqual([20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0]);
    });
    test('should return [v, null] if the generator ends first with v', () => {
      const gen = pipe(
        take(4),
        returning(100)
      )(feedMap(x => 2 * x, 10))
      const result = pipe(
        feed(range(9, -1)),
        yieldReturnValue
      )(gen)
      expect([...result]).toEqual([20, 18, 16, 14, [100, null]]);
    });
    test('should return [null, v] if the feeder ends first with v', () => {
      const feeder = pipe(
        take(4),
        returning(200)
      )(range(9, -1))
      const result = pipe(
        feed(feeder),
        yieldReturnValue
      )(feedMap(x => 2 * x, 10))
      expect([...result]).toEqual([20, 18, 16, 14, 12, [null, 200]]);
    });
    test('should return [v, w] if the generator ends in v and the feeder with w', () => {
      const gen = pipe(
        take(4),
        returning(100)
      )(feedMap(x => 2 * x, 10))
      const feeder = pipe(
        take(4),
        returning(200)
      )(range(9, -1))
      const result = pipe(
        feed(feeder),
        yieldReturnValue
      )(gen)
      expect([...result]).toEqual([20, 18, 16, 14, [100, 200]]);
    });
  });
  describe('asynchronous mode', () => {
    test('should double the input of the feeder', async () => {
      const result = pipe(
        feed(toAsync(range(9, -1)))
      )(toAsync(feedMap(x => 2 * x, 10)))
      expect(await toArray(result)).toEqual([20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0]);
    });
    test('should return [v, null] if the generator ends first with v', async () => {
      const gen = pipe(
        take(4) as (_: AsyncGenerator<number>) => AsyncGenerator<number>,
        returning(100)
      )(toAsync(feedMap(x => 2 * x, 10)))
      const result = pipe(
        feed(toAsync(range(9, -1))),
        yieldReturnValue
      )(gen)
      expect(await toArray(result)).toEqual([20, 18, 16, 14, [100, null]]);
    });
    test('should return [null, v] if the feeder ends first with v', async () => {
      const feeder = pipe(
        take(4) as (_: AsyncGenerator<number>) => AsyncGenerator<number>,
        returning(200)
      )(toAsync(range(9, -1)))
      const result = pipe(
        feed(feeder),
        yieldReturnValue
      )(toAsync(feedMap(x => 2 * x, 10)))
      expect(await toArray(result)).toEqual([20, 18, 16, 14, 12, [null, 200]]);
    });
    test('should return [v, w] if the generator ends in v and the feeder with w', async () => {
      const gen = pipe(
        take(4) as (_: AsyncGenerator<number>) => AsyncGenerator<number>,
        returning(100)
      )(toAsync(feedMap(x => 2 * x, 10)))
      const feeder = pipe(
        take(4) as (_: AsyncGenerator<number>) => AsyncGenerator<number>,
        returning(200)
      )(toAsync(range(9, -1)))
      const result = pipe(
        feed(feeder),
        yieldReturnValue
      )(gen)
      expect(await toArray(result)).toEqual([20, 18, 16, 14, [100, 200]]);
    });
  });
});

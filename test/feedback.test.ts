import {describe, expect, test} from '@jest/globals';
import { feedback } from '../src/feedback';
import { feedMap } from '../src/feedMap';
import { returning } from '../src/returning';
import { toAsync } from '../src/toAsync';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toArray } from '../src/toArray';
import { take } from '../src/take';

describe('feedback', () => {
  describe('synchronous mode', () => {
    test('should feedback a generator', () => {
      const gen = feedMap<number,number>((x: number) => x * 2, 0)
      const feeder = feedMap<number,number>((x: number) => x + 1, 10)
      const result = take(10)(feedback<number>(feeder)(gen))
      expect([...result]).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142]);
    });
    test('should feedback a generator and return [v, null] when the generator returns v', () => {
      const gen = take<number, number, number>(10)(feedMap<number,number>((x: number) => x * 2, 0))
      const feeder = feedMap<number,number>((x: number) => x + 1, 10)
      const result = yieldReturnValue(feedback<number>(feeder)(returning<number>(-1)(gen)))
      expect([...result]).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [-1, null]]);
    });
    test('should feedback a generator and return [null, w] when the feeder returns w', () => {
      const gen = feedMap<number,number>((x: number) => x * 2, 0)
      const feeder = take<number, number, number>(9)(feedMap<number,number>((x: number) => x + 1, 10))
      const result = yieldReturnValue(feedback<number>(returning<number>(-2)(feeder))(gen))
      expect([...result]).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [null, -2]]);
    });
    test('should feedback a generator and return [null, w] when the feeder returns w', () => {
      const gen = take<number, number, number>(10)(feedMap<number,number>((x: number) => x * 2, 0))
      const feeder = take<number, number, number>(10)(feedMap<number,number>((x: number) => x + 1, 10))
      const result = yieldReturnValue(feedback<number>(returning<number>(-2)(feeder))(returning<number>(-1)(gen)))
      expect([...result]).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [-1, -2]]);
    });
  });
  describe('asynchronous mode', () => {
    test('should feedback a generator', async () => {
      const gen = toAsync(feedMap<number,number>((x: number) => x * 2, 0))
      const feeder = toAsync(feedMap<number,number>((x: number) => x + 1, 10))
      const result = take(10)(feedback(feeder)(gen))
      expect(await toArray(result)).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142]);
    });
    test('should feedback a generator and return [v, null] when the generator returns v', async () => {
      const gen = take<number, number, number>(10)(toAsync(feedMap<number,number>((x: number) => x * 2, 0)))
      const feeder = feedMap<number,number>((x: number) => x + 1, 10)
      const result = yieldReturnValue(feedback(toAsync(feeder))(returning<number>(-1)(gen)))
      expect(await toArray(result)).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [-1, null]]);
    });
    test('should feedback a generator and return [null, w] when the feeder returns w', async () => {
      const gen = toAsync(feedMap<number,number>((x: number) => x * 2, 0))
      const feeder = take<number, number, number>(9)(toAsync(feedMap<number,number>((x: number) => x + 1, 10)))
      const result = yieldReturnValue(feedback(returning<number>(-2)(feeder))(gen))
      expect(await toArray(result)).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [null, -2]]);
    });
    test('should feedback a generator and return [null, w] when the feeder returns w', async () => {
      const gen = take<number, number, number>(10)(toAsync(feedMap<number,number>((x: number) => x * 2, 0)))
      const feeder = take<number, number, number>(10)(toAsync(feedMap<number,number>((x: number) => x + 1, 10)))
      const result = yieldReturnValue(feedback(returning<number>(-2)(feeder))(returning<number>(-1)(gen)))
      expect(await toArray(result)).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [-1, -2]]);
    });
  });
});

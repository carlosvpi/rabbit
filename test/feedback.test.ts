import {describe, expect, test} from '@jest/globals';
import { head } from '../src/head';
import { feedback } from '../src/feedback';
import { feedMap } from '../src/feedMap';
import { returning } from '../src/returning';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('feedback', () => {
  test('should feedback a generator', () => {
    const gen = feedMap<number,number>((x: number) => x * 2, 0)
    const feeder = feedMap<number,number>((x: number) => x + 1, 10)
    const result = head(10)(feedback(feeder)(gen))
    expect([...result]).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142]);
  });
  test('should feedback a generator and return [v, null] when the generator returns v', () => {
    const gen = head<number, number, number>(10)(feedMap<number,number>((x: number) => x * 2, 0))
    const feeder = feedMap<number,number>((x: number) => x + 1, 10)
    const result = yieldReturnValue(feedback(feeder)(returning<number>(-1)(gen)))
    expect([...result]).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [-1, null]]);
  });
  test('should feedback a generator and return [null, w] when the feeder returns w', () => {
    const gen = feedMap<number,number>((x: number) => x * 2, 0)
    const feeder = head<number, number, number>(9)(feedMap<number,number>((x: number) => x + 1, 10))
    const result = yieldReturnValue(feedback(returning<number>(-2)(feeder))(gen))
    expect([...result]).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [null, -2]]);
  });
  test('should feedback a generator and return [null, w] when the feeder returns w', () => {
    const gen = head<number, number, number>(10)(feedMap<number,number>((x: number) => x * 2, 0))
    const feeder = head<number, number, number>(10)(feedMap<number,number>((x: number) => x + 1, 10))
    const result = yieldReturnValue(feedback(returning<number>(-2)(feeder))(returning<number>(-1)(gen)))
    expect([...result]).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [-1, -2]]);
  });
});
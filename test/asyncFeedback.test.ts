import {describe, expect, test} from '@jest/globals';
import { asyncTake } from '../src/asyncTake';
import { asyncFeedback } from '../src/asyncFeedback';
import { feedMap } from '../src/feedMap';
import { asyncReturning } from '../src/asyncReturning';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';

describe('asyncFeedback', () => {
  test('should asyncFeedback a generator', async () => {
    const gen = toAsync(feedMap<number,number>((x: number) => x * 2, 0))
    const feeder = toAsync(feedMap<number,number>((x: number) => x + 1, 10))
    const result = asyncTake(10)(asyncFeedback(feeder)(gen))
    expect(await asyncToArray(result)).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142]);
  });
  test('should asyncFeedback a generator and return [v, null] when the generator returns v', async () => {
    const gen = asyncTake<number, number, number>(10)(toAsync(feedMap<number,number>((x: number) => x * 2, 0)))
    const feeder = feedMap<number,number>((x: number) => x + 1, 10)
    const result = asyncYieldReturnValue(asyncFeedback(toAsync(feeder))(asyncReturning<number>(-1)(gen)))
    expect(await asyncToArray(result)).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [-1, null]]);
  });
  test('should asyncFeedback a generator and return [null, w] when the feeder returns w', async () => {
    const gen = toAsync(feedMap<number,number>((x: number) => x * 2, 0))
    const feeder = asyncTake<number, number, number>(9)(toAsync(feedMap<number,number>((x: number) => x + 1, 10)))
    const result = asyncYieldReturnValue(asyncFeedback(asyncReturning<number>(-2)(feeder))(gen))
    expect(await asyncToArray(result)).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [null, -2]]);
  });
  test('should asyncFeedback a generator and return [null, w] when the feeder returns w', async () => {
    const gen = asyncTake<number, number, number>(10)(toAsync(feedMap<number,number>((x: number) => x * 2, 0)))
    const feeder = asyncTake<number, number, number>(10)(toAsync(feedMap<number,number>((x: number) => x + 1, 10)))
    const result = asyncYieldReturnValue(asyncFeedback(asyncReturning<number>(-2)(feeder))(asyncReturning<number>(-1)(gen)))
    expect(await asyncToArray(result)).toEqual([0, 22, 46, 94, 190, 382, 766, 1534, 3070, 6142, [-1, -2]]);
  });
});
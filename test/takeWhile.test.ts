import {describe, expect, test} from '@jest/globals';
import { takeWhile } from '../src/takeWhile';
import { range } from '../src/range';
import { returning } from '../src/returning';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { pipe } from '../src/pipe';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';

describe('takeWhile', () => {
  test('should get the first elements until one is no less than 5', () => {
    const result = takeWhile((x: number) => x < 5)(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4]);
  });
  test('should get the first elements until the index is === 5', () => {
    const result = takeWhile((_: number, i: number) => i < 5)(range(10, 20))
    expect([...result]).toEqual([10, 11, 12, 13, 14]);
  });
  test('should get the first elements until the `next` is === 5', () => {
    const result = pipe(
      takeWhile<number>((_1: number, _2: number, next: number) => !next || next < 10),
      feed<number>(range(1)),
    )(feedMap((x:number) => x * 2, 0))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
  test('should return the return value of g if g runs out', () => {
    const result = pipe(
      returning<number>(100),
      takeWhile((x: number) => x < 10),
      yieldReturnValue,
    )(range(0, 5))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should return the specified return value argument if g does not run out', () => {
    const result = yieldReturnValue(takeWhile((x: number) => x < 5, 100)(range(0, 10)))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should return the specified return value argument even if g does run out with its own return value', () => {
    const result = yieldReturnValue(takeWhile((x: number) => x < 5, 100)(range(0, 10, 1, 200)))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should pass the next value to the generator', () => {
    const result = pipe(
      feed<number>(range(1)),
      takeWhile<number>((x: number) => x < 10, 100),
    )(feedMap((x:number) => x * 2, 0))
    expect([...result]).toEqual([0, 2, 4, 6, 8]);
  });
});
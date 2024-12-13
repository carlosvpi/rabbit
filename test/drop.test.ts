import {describe, expect, test} from '@jest/globals';
import { drop } from '../src/drop';
import { range } from '../src/range';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { feedMap } from '../src/feedMap';
import { feed } from '../src/feed';

describe('drop', () => {
  test('should not drop the if no number provided', () => {
    const result = drop()(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should drop the first 5 elements', () => {
    const result = drop(5)(range(0, 10))
    expect([...result]).toEqual([5, 6, 7, 8, 9]);
  });
  test('should drop the first 10 elements when `g` finishes at 5', () => {
    const result = drop(10)(range(0, 5))
    expect([...result]).toEqual([]);
  });
  test('should return the same as `g` if no return value specified', () => {
    const result = yieldReturnValue(drop(5)(range(0, 10, 1, 100)))
    expect([...result]).toEqual([5, 6, 7, 8, 9, 100]);
  });
  test('should return the specified value even if `g` returns a value', () => {
    const result = yieldReturnValue(drop(5, 200)(range(0, 10, 1, 100)))
    expect([...result]).toEqual([5, 6, 7, 8, 9, 200]);
  });
  test('should pass down the `next` value', () => {
    const result = feed(range(1, 10))(drop(5)(feedMap((x: number) => x * 2, 0)))
    expect([...result]).toEqual([NaN, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
});
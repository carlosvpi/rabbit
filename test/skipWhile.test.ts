import {describe, expect, test} from '@jest/globals';
import { skipWhile } from '../src/skipWhile';
import { range } from '../src/range';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { feedMap } from '../src/feedMap';
import { feed } from '../src/feed';


describe('skipWhile', () => {
  test('should skip while the element is < 5', () => {
    const result = skipWhile((x: number) => x < 5)(range(0, 10))
    expect([...result]).toEqual([5, 6, 7, 8, 9]);
  });
  test('should skip while the element is < 10 when `g` finishes at 5', () => {
    const result = skipWhile((x: number) => x < 10)(range(0, 5))
    expect([...result]).toEqual([]);
  });
  test('should return the same as `g` if no return value specified', () => {
    const result = yieldReturnValue(skipWhile((x: number) => x < 5)(range(0, 10, 1, 100)))
    expect([...result]).toEqual([5, 6, 7, 8, 9, 100]);
  });
  test('should return the specified value even if `g` returns a value', () => {
    const result = yieldReturnValue(skipWhile((x: number) => x < 5, 200)(range(0, 10, 1, 100)))
    expect([...result]).toEqual([5, 6, 7, 8, 9, 200]);
  });
  test('should take into account the index', () => {
    const result = skipWhile((x: number, i: number) => x > i)(range(10, 0))
    expect([...result]).toEqual([5, 4, 3, 2, 1]);
  });
  test('should pass down the `next` value', () => {
    const result = feed(range(1, 10))(skipWhile((x: number) => x < 5)(feedMap((x: number) => x * 2, 0)))
    expect([...result]).toEqual([NaN, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { slice } from '../src/slice';
import { range } from '../src/range';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { feedMap } from '../src/feedMap';
import { feed } from '../src/feed';

describe('slice', () => {
  test('should slice from 0 onwards elements', () => {
    const result = slice()(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should slice from 5 onwards elements', () => {
    const result = slice(5)(range(0, 10))
    expect([...result]).toEqual([5, 6, 7, 8, 9]);
  });
  test('should slice from 0 to 5 elements', () => {
    const result = slice(0, 5)(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4]);
  });
  test('should slice from 1 to 9 stepping 2 elements', () => {
    const result = slice(1, 9, 2)(range(0, 10))
    expect([...result]).toEqual([1, 3, 5, 7]);
  });
  test('should slice from 1 to 9 stepping 2 elements and return the returning value', () => {
    const result = yieldReturnValue(slice(1, 9, 2, 200)(range(0, 10)))
    expect([...result]).toEqual([1, 3, 5, 7, 200]);
  });
  test('should slice from 1 to 9 stepping 2 elements and return the returning value of the generator if not specified', () => {
    const result = yieldReturnValue(slice(0, Infinity, 1)(range(1, 9, 2, 100)))
    expect([...result]).toEqual([1, 3, 5, 7, 100]);
  });
  test('should slice from 1 to 9 stepping 2 elements and return the returning value even if the generator has a return value', () => {
    const result = yieldReturnValue(slice(1, 20, 2, 200)(range(0, 10, 1, 100)))
    expect([...result]).toEqual([1, 3, 5, 7, 9, 200]);
  });
  test('should pass down the `next` value', () => {
    const result = feed(range())(slice(1, 10)(feedMap((x: number) => x * 2, 0)))
    expect([...result]).toEqual([NaN, 0, 2, 4, 6, 8, 10, 12, 14]);
  });
});
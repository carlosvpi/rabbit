import {describe, expect, test} from '@jest/globals';
import { sortInsert } from '../src/sortInsert';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('sortInsert', () => {
  test('should insert in the beginning and return the return value of the generator if no return value specified', () => {
    const result = yieldReturnValue(sortInsert(-1, (a, b) => a - b)(range(0, 10, 2, 100)))
    expect([...result]).toEqual([-1, 0, 2, 4, 6, 8, 100]);
  });
  test('should insert in the middle and return the return value of the generator if no return value specified', () => {
    const result = yieldReturnValue(sortInsert(5, (a, b) => a - b)(range(0, 10, 2, 100)))
    expect([...result]).toEqual([0, 2, 4, 5, 6, 8, 100]);
  });
  test('should insert in the end and return the return value of the generator if no return value specified', () => {
    const result = yieldReturnValue(sortInsert(9, (a, b) => a - b)(range(0, 10, 2, 100)))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 9, 100]);
  });
  test('should pass down the `next` value, preserving the feed', () => {
    const result = feed(range(1, 10, 2))(sortInsert(9, (a, b) => a - b)(feedMap((x: number) => x * 2, 0)))
    expect([...result]).toEqual([0, 2, 6, 9, 10, 14]);
  });
});
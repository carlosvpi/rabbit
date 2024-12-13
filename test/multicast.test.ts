import {describe, expect, test} from '@jest/globals';
import { multicast } from '../src/multicast';
import { range } from '../src/range';
import { take } from '../src/take';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('multicast', () => {
  test('should get two multicasts and they should be independent', () => {
    const [c1, c2]: Generator<number>[] = [...take<Generator<number>>(2)(multicast(range(0, 10)))]

    expect([...c1]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect([...c2]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should get two multicasts and each one of them should return the return value of the original', () => {
    const [c1, c2] = [...take<Generator<number>>(2)(multicast(range(0, 10, 1, 100)))]

    expect([...yieldReturnValue(c1)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    expect([...yieldReturnValue(c2)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
  });
});
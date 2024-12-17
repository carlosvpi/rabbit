import {describe, expect, test} from '@jest/globals';
import { fromStartMulticast } from '../src/fromStartMulticast';
import { range } from '../src/range';
import { take } from '../src/take';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('fromStartMulticast', () => {
  test('should get two multicasts and they should be independent', () => {
    const [c1, c2]: Generator<number>[] = [...take<Generator<number>>(2)(fromStartMulticast(range(0, 10)))]

    expect([...c1]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect([...c2]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should replay the history of the generator for a new fromStartMulticast', () => {
    const multicasted = fromStartMulticast(range(0, 10))
    const c1 = take<number>(5)(multicasted.next().value)

    expect([...c1]).toEqual([0, 1, 2, 3, 4]);

    const c2 = take<number>(10)(multicasted.next().value)
    expect([...c2]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should get two multicasts and each one of them should return the return value of the original', () => {
    const [c1, c2] = [...take<Generator<number>>(2)(fromStartMulticast(range(0, 10, 1, 100)))]

    expect([...yieldReturnValue(c1)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    expect([...yieldReturnValue(c2)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { multicastAsync } from '../src/multicastAsync';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { take } from '../src/take';
import { asyncTake } from '../src/asyncTake';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('multicastAsync', () => {
  test('should get two multicasts and they should be independent', async () => {
    const [c1, c2]: AsyncGenerator<number>[] = [...take<AsyncGenerator<number>>(2)(multicastAsync(toAsync(range(0, 10))))]

    expect(await asyncToArray(c1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(await asyncToArray(c2)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should replay the history of the generator for a new multicast', async () => {
    const multicasted = multicastAsync(toAsync(range(0, 10)))
    const c1 = asyncTake<number>(5)(multicasted.next().value)

    expect(await asyncToArray(c1)).toEqual([0, 1, 2, 3, 4]);

    const c2 = asyncTake<number>(10)(multicasted.next().value)
    expect(await asyncToArray(c2)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should get two multicasts and each one of them should return the return value of the original', async () => {
    const [c1, c2] = [...take<AsyncGenerator<number>>(2)(multicastAsync(toAsync(range(0, 10, 1, 100))))]

    expect(await asyncToArray(asyncYieldReturnValue(c1))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    expect(await asyncToArray(asyncYieldReturnValue(c2))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
  });
});
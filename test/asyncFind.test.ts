import {describe, expect, test} from '@jest/globals';
import { asyncFind } from '../src/asyncFind';
import { asyncReturning } from '../src/asyncReturning';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';

describe('asyncFind', () => {
  test('should asyncFind the item that fulfils the predicate', async () => {
    const result = asyncFind((x: number) => x % 5 === 4)(toAsync(range(0, 5)))
    expect(await result).toEqual(4);
  });
  test('should return `null` if no item fulfils the predicate', async () => {
    const result = asyncFind((x: number) => x % 6 === 5)(toAsync(range(0, 5)))
    expect(await result).toEqual(null);
  });
  test('should ignore the return value of the generator', async () => {
    const result = asyncFind((x: number) => x % 6 === 5)(asyncReturning<number>(5)(toAsync(range(0, 5))))
    expect(await result).toEqual(null);
  });
});
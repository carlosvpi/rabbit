import {describe, expect, test} from '@jest/globals';
import { copies } from '../src/copies';
import { range } from '../src/range';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('copies', () => {
  test('should get no copies', () => {
    const result = copies(0)(range(0, 10))
    expect(result).toEqual([]);
  });
  test('should get two copies and they should be independent', () => {
    const [c1, c2] = copies(2)(range(0, 10))

    expect([...c1]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect([...c2]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should get two copies and each one of them should return the return value of the original', () => {
    const [c1, c2] = copies(2)(range(0, 10, 1, 100))

    expect([...yieldReturnValue(c1)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    expect([...yieldReturnValue(c2)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
  });
});
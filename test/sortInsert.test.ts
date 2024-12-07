import {describe, expect, test} from '@jest/globals';
import { sortInsert } from '../src/sortInsert';
import { range } from '../src/range';

describe('sortInsert', () => {
  test('should insert in the beginning', () => {
    const result = sortInsert(-1, (a, b) => a - b)(range(0, 10, 2))
    expect([...result]).toEqual([-1, 0, 2, 4, 6, 8]);
  });
  test('should insert in the middle', () => {
    const result = sortInsert(5, (a, b) => a - b)(range(0, 10, 2))
    expect([...result]).toEqual([0, 2, 4, 5, 6, 8]);
  });
  test('should insert in the middle', () => {
    const result = sortInsert(9, (a, b) => a - b)(range(0, 10, 2))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 9]);
  });
});
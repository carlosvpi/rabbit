import {describe, expect, test} from '@jest/globals';
import { range } from '../src/range';

describe('range', () => {
  test('should produce numbers from 0 to 10 (excluded)', () => {
    const result = range(0, 10)
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should produce numbers from 0 to 10 (excluded), stepping 2', () => {
    const result = range(0, 10, 2)
    expect([...result]).toEqual([0, 2, 4, 6, 8]);
  });
  test('should produce numbers from 5 to -5 (excluded), stepping 2', () => {
    const result = range(5, -5, 2)
    expect([...result]).toEqual([5, 3, 1, -1, -3]);
  });
});
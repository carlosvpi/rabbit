import {describe, expect, test} from '@jest/globals';
import { toArray } from '../src/toArray';
import { range } from '../src/range';

describe('toArray', () => {
  test('should produce an array and return its return value arugment', () => {
    const result = toArray<number | string>(range(0, 4))
    expect(result).toEqual([0, 1, 2, 3]);
  });
});
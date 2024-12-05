import {describe, expect, test} from '@jest/globals';
import { prepend } from '../src/prepend';
import { range } from '../src/range';

describe('prepend', () => {
  test('should prepend 5 elements to our generator', () => {
    const result = prepend(range(0,5))(range(5, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
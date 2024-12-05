import {describe, expect, test} from '@jest/globals';
import { append } from '../src/append';
import { range } from '../src/range';

describe('append', () => {
  test('should append 5 elements to our generator', () => {
    const result = append(range(5,10))(range(0, 5))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
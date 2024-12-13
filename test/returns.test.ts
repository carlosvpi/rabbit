import {describe, expect, test} from '@jest/globals';
import { range } from '../src/range';
import { returns } from '../src/returns';

describe('returning', () => {
  test('should return the same as the original generator', () => {
    const result = returns(range(0, 10, 1, 100))
    expect(result).toEqual(100);
  });
});
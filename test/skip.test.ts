import {describe, expect, test} from '@jest/globals';
import { skip } from '../src/skip';
import { range } from '../src/range';

describe('skip', () => {
  test('should skip the first 5 elements', () => {
    const result = skip(5)(range(0, 10))
    expect([...result]).toEqual([5, 6, 7, 8, 9]);
  });
});
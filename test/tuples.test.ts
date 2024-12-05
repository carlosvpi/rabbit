import {describe, expect, test} from '@jest/globals';
import { tuples } from '../src/tuples';
import { range } from '../src/range';

describe('tuples', () => {
  test('should tuples the odd elements', () => {
    const result = tuples(3)(range(0, 12))
    expect([...result]).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]]);
  });
});
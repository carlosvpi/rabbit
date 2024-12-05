import {describe, expect, test} from '@jest/globals';
import { runningTuples } from '../src/runningTuples';
import { range } from '../src/range';

describe('runningTuples', () => {
  test('should return tuples of 3 elements', () => {
    const result = runningTuples(3)(range(0, 6))
    expect([...result]).toEqual([[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5]]);
  });
});
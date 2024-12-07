import {describe, expect, test} from '@jest/globals';
import { sortMerge } from '../src/sortMerge';
import { range } from '../src/range';

describe('sortMerge', () => {
  test('should concat two sorted generators keeping the output sorted', () => {
    const result = sortMerge(range(0, 10, 2), (a, b) => a - b)(range(1, 11, 2))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
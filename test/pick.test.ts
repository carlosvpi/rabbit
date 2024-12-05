import {describe, expect, test} from '@jest/globals';
import { pick } from '../src/pick';
import { range } from '../src/range';

describe('pick', () => {
  test('should pick the ith element', () => {
    const result = pick([1, 0, 0, 2])(range())
    expect([...result]).toEqual([1, 1, 1, 3]);
  });
});
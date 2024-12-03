import {describe, expect, test} from '@jest/globals';
import { pick } from '../src/pick';
import { range } from '../src/range';

describe('pick', () => {
  test('should pick the ith element', () => {
    const result = pick([...range(5, 11)])(range(0, 100))
    expect([...result]).toEqual([4,  10, 17, 25, 34, 44]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { slice } from '../src/slice';
import { range } from '../src/range';

describe('slice', () => {
  test('should slice the odd elements', () => {
    const result = slice(5, 15)(range())
    expect([...result]).toEqual([5, 7, 9, 11, 13, 15, 17, 19, 21]);
  });
});
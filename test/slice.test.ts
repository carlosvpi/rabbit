import {describe, expect, test} from '@jest/globals';
import { slice } from '../src/slice';
import { range } from '../src/range';

describe('slice', () => {
  test('should slice from 5 to 15th elements', () => {
    const result = slice(5, 15)(range())
    expect([...result]).toEqual([5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  });
  test('should slice from 5 to 15th elements, stepping 2', () => {
    const result = slice(5, 15, 2)(range())
    expect([...result]).toEqual([5, 7, 9, 11, 13, 15, 17, 19, 21, 23]);
  });
});
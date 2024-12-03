import {describe, expect, test} from '@jest/globals';
import { reduce } from '../src/reduce';
import { range } from '../src/range';

describe('reduce', () => {
  test('should reduce the odd elements, when default is given', () => {
    const result = reduce((acc: number, x: number) => acc + x, 100)(range(0, 10))
    expect([...result]).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145]);
  });
  test('should reduce the odd elements, when default is not given', () => {
    const result = reduce((acc: number, x: number) => acc + x)(range(0, 10))
    expect([...result]).toEqual([1,  3,  6, 10, 15, 21, 28, 36, 45]);
  });
});
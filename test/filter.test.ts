import {describe, expect, test} from '@jest/globals';
import { filter } from '../src/filter';
import { range } from '../src/range';

describe('filter', () => {
  test('should filter the odd elements', () => {
    const result = filter((x: number) => x % 2 === 0)(range(0, 10))
    expect([...result]).toEqual([0, 2, 4, 6, 8]);
  });
});
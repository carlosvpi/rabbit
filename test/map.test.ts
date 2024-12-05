import {describe, expect, test} from '@jest/globals';
import { map } from '../src/map';
import { range } from '../src/range';

describe('map', () => {
  test('should double elements', () => {
    const result = map((x: number) => x * 2)(range(0, 10))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
});
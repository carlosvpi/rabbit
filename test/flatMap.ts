import {describe, expect, test} from '@jest/globals';
import { flatMap } from '../src/flatMap';
import { range } from '../src/range';

describe('flatMap', () => {
  test('should give numbers in ranges from 0 onwards', () => {
    const result = flatMap((x: number) => range(0, x))(range(0, 5))
    expect([...result]).toEqual([0, 0, 1, 0, 1, 2, 0, 1, 2, 3]);
  });
});
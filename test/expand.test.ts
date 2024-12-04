import {describe, expect, test} from '@jest/globals';
import { expand } from '../src/expand';
import { range } from '../src/range';

describe('expand', () => {
  test('should expand the odd elements', () => {
    const result = expand((x: number) => range(0, x))(range(0, 5))
    expect([...result]).toEqual([0, 0, 1, 0, 1, 2, 0, 1, 2, 3]);
  });
});
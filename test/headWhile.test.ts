import {describe, expect, test} from '@jest/globals';
import { headWhile } from '../src/headWhile';
import { range } from '../src/range';

describe('headWhile', () => {
  test('should headWhile the odd elements', () => {
    const result = headWhile((x: number) => x < 5)(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4]);
  });
});
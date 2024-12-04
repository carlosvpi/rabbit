import {describe, expect, test} from '@jest/globals';
import { skipWhile } from '../src/skipWhile';
import { range } from '../src/range';

describe('skipWhile', () => {
  test('should skipWhile the odd elements', () => {
    const result = skipWhile((x: number) => x < 5)(range(0, 10))
    expect([...result]).toEqual([5, 6, 7, 8, 9]);
  });
});
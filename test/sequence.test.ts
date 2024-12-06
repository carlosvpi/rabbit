import {describe, expect, test} from '@jest/globals';
import { sequence } from '../src/sequence';
import { head } from '../src/head';

describe('sequence', () => {
  test('should create the fibonacci sequence', () => {
    const result = head(10)(sequence((a: number, b: number) => a + b, 1, 1))
    expect([...result]).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
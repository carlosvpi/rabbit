import {describe, expect, test} from '@jest/globals';
import { head } from '../src/head';
import { range } from '../src/range';

describe('head', () => {
  test('should get the first 5 elements', () => {
    const result = head(5)(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4]);
  });
  test('should get the 1st element when no argument provided', () => {
    const result = head()(range(0, 10))
    expect([...result]).toEqual([0]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { pickFeed } from '../src/pickFeed';
import { range } from '../src/range';

describe('pickFeed', () => {
  test('should pick the ith element (given by another generator)', () => {
    const result = pickFeed(range(5))(range(0, 100))
    expect([...result]).toEqual([5, 11, 18, 26, 35, 45, 56, 68, 81, 95]);
  });
});
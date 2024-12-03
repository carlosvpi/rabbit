import {describe, expect, test} from '@jest/globals';
import { pickFeed } from '../src/pickFeed';
import { range } from '../src/range';

describe('pickFeed', () => {
  test('should pick the ith element', () => {
    const result = pickFeed(range(5))(range(0, 100))
    expect([...result]).toEqual([4, 10, 17, 25, 34, 44, 55, 67, 80, 94]);
  });
});
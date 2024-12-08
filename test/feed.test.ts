import {describe, expect, test} from '@jest/globals';
import { feed } from '../src/feed';
import { range } from '../src/range';
import { feedMap } from '../src/feedMap';

describe('feed', () => {
  test('should double the input of the feeder', () => {
    const gen = feedMap(x => 2 * x, 10)
    const result = feed(range(9, -1))(gen)
    expect([...result]).toEqual([20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0]);
  });
});
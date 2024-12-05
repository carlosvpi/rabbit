import {describe, expect, test} from '@jest/globals';
import { feed } from '../src/feed';

describe('feed', () => {
  test('should double the input of the feeder', () => {
    function* feeder () {
      let i = 9
      while (i) yield i--
    }
    function* gen () {
      yield 20
      let v = 9
      while (v) v = yield 2 * v
      yield 0
    }
    const result = feed(feeder())(gen())
    expect([...result]).toEqual([20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0]);
  });
});
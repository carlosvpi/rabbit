import {describe, expect, test} from '@jest/globals';
import { feed } from '../src/feed';

describe('feed', () => {
  test('should traverse breadth first a tree', () => {
    function* feeder () {
      let i = 10
      while (i) yield i--
    }
    function* gen () {
      let i = 0
      let v = yield i++
      while (v) v = yield v * 100 + i++
    }
    const result = feed(gen(), feeder())
    expect([...result]).toEqual([0, 1001, 902, 803, 704, 605, 506, 407, 308, 209, 110]);
  });
});
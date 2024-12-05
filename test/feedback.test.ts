import {describe, expect, test} from '@jest/globals';
import { head } from '../src/head';
import { feedback } from '../src/feedback';
import { feedMap } from '../src/feedMap';

describe('feedback', () => {
  test('should feedback a custom generator', () => {
    function* gen () {
      let i = 1
      let v = yield i++
      while (v>0 && v<1000) {
        v = yield v * 10 + i++
      }
    }
    const result = feedback(gen())(gen())
    expect([...result]).toEqual([1, 12, 1223]);
  });
  test('should feedback a feedMap generator', () => {
    const result = head(10)(feedback(feedMap(x => 2 * x, 0))(feedMap(x => 1 + x, 0)))
    expect([...result]).toEqual([1, 1, 3, 7, 15, 31, 63, 127, 255, 511]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { last } from '../src/last';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { head } from '../src/head';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('last', () => {
  test('should get last of three elements', () => {
    const result = last(3)(range(0, 5))
    expect([...result]).toEqual([[0, 1, 2], [1, 2, 3], [2, 3, 4]]);
  });
  test('should get last of 1 element when no argument is passed', () => {
    const result = last()(range(0, 5))
    expect([...result]).toEqual([[0], [1], [2], [3], [4]]);
  });
  test('should pass down the `next` value for every chunk', () => {
    const result = head(4)(feed(range(1))(last(3)(feedMap((x: number) => x * 2, 0))))
    expect([...result]).toEqual([[0, NaN, NaN], [NaN, NaN, 2], [NaN, 2, 4], [2, 4, 6]]);
  });
  test('should return the same as g', () => {
    const result = yieldReturnValue(last(3)(range(0, 5, 1, 100)))
    expect([...result]).toEqual([[0, 1, 2], [1, 2, 3], [2, 3, 4], 100]);
  });
});
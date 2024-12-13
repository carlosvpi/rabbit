import {describe, expect, test} from '@jest/globals';
import { chunks } from '../src/chunks';
import { range } from '../src/range';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { feed } from '../src/feed';
import { take } from '../src/take';
import { feedMap } from '../src/feedMap';

describe('chunks', () => {
  test('should get chunks of three elements', () => {
    const result = chunks(3)(range(0, 12))
    expect([...result]).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]]);
  });
  test('should get chunks of three elements (the last chunk is not full if `g` ends abruptly)', () => {
    const result = chunks(3)(range(0, 10))
    expect([...result]).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]);
  });
  test('should get chunks of 1 element when no argument is passed', () => {
    const result = chunks()(range(0, 5))
    expect([...result]).toEqual([[0], [1], [2], [3], [4]]);
  });
  test('should pass down the `next` value for every chunk', () => {
    const result = take(4)(feed(range(1))(chunks(3)(feedMap((x: number) => x * 2, 0))))
    expect([...result]).toEqual([[0, NaN, NaN], [2, 2, 2], [4, 4, 4], [6, 6, 6]]);
  });
  test('should return the same as g', () => {
    const result = yieldReturnValue(chunks(3)(range(0, 5, 1, 100)))
    expect([...result]).toEqual([[0, 1, 2], [3, 4], 100]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { last } from '../src/last';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { take } from '../src/take';
import { feedMap } from '../src/feedMap';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('last', () => {
  describe('synchronous mode', () => {
    test('should get last of three elements', () => {
      const result = last(3)(range(0, 5))
      expect([...result]).toEqual([[0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4]]);
    });
    test('should get last of 1 element when no argument is passed', () => {
      const result = last()(range(0, 5))
      expect([...result]).toEqual([[0], [1], [2], [3], [4]]);
    });
    test('should pass down the `next` value for every chunk', () => {
      const result = take(4)(feed(range(1))(last(3)(feedMap((x: number) => x * 2, 0))))
      expect([...result]).toEqual([[0], [0, 2], [0, 2, 4], [2, 4, 6]]);
    });
    test('should return the same as g', () => {
      const result = yieldReturnValue(last(3)(range(0, 5, 1, 100)))
      expect([...result]).toEqual([[0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4], 100]);
    });
  });
  describe('asynchronous mode', () => {
    test('should get last of three elements', async () => {
      const result = last(3)(toAsync(range(0, 5)))
      expect(await toArray(result)).toEqual([[0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4]]);
    });
    test('should get last of 1 element when no argument is passed', async () => {
      const result = last()(toAsync(range(0, 5)))
      expect(await toArray(result)).toEqual([[0], [1], [2], [3], [4]]);
    });
    test('should pass down the `next` value for every chunk', async () => {
      const result = take(4)(feed(toAsync(range(1)))(last(3)(toAsync(feedMap((x: number) => x * 2, 0)))))
      expect(await toArray(result)).toEqual([[0], [0, 2], [0, 2, 4], [2, 4, 6]]);
    });
    test('should return the same as g', async () => {
      const result = yieldReturnValue(last(3)(toAsync(range(0, 5, 1, 100))))
      expect(await toArray(result)).toEqual([[0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4], 100]);
    });
  });
});
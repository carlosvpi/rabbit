import {describe, expect, test} from '@jest/globals';
import { prepend } from '../src/prepend';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';
import { take } from '../src/take';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('prepend', () => {
  describe('synchronous mode', () => {
    test('should prepend 5 elements to our generator', () => {
      const result = prepend(range(0, 5))(range(5, 10))
      expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    test('should prepend 5 elements to our generator, passing down the "next" values introduced', () => {
      const fed = take<number>(5)(feedMap<number, number>((x:number) => 100 - x, 0))
      const appended = prepend<number>(fed)(feedMap<number, number>((x:number) => x, 5))
      const result = feed(range(1, 10))(appended)
      expect([...result]).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9]);
    });
    test('should return the return value of the appended generator', () => {
      const result = yieldReturnValue(prepend<number>(range(100, 95))(range(5, 10, 1, 0)))
      expect([...result]).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9, 0]);
    });
  });
  describe('asynchronous mode', () => {
    test('should prepend 5 elements to our generator', async () => {
      const result = prepend(toAsync(range(0, 5)))(toAsync(range(5, 10)))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    test('should prepend 5 elements to our generator, passing down the "next" values introduced', async () => {
      const fed = take<number>(5)(toAsync(feedMap<number, number>((x:number) => 100 - x, 0)))
      const appended = prepend<number>(fed)(toAsync(feedMap<number, number>((x:number) => x, 5)))
      const result = feed(toAsync(range(1, 10)))(appended)
      expect(await toArray(result)).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9]);
    });
    test('should return the return value of the appended generator', async () => {
      const result = yieldReturnValue(prepend<number>(toAsync(range(100, 95)))(toAsync(range(5, 10, 1, 0))))
      expect(await toArray(result)).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9, 0]);
    });
  });
});
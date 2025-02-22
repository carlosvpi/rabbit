import {describe, expect, test} from '@jest/globals';
import { append } from '../src/append';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { range } from '../src/range';
import { take } from '../src/take';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';

describe('append', () => {
  describe('synchronous mode', () => {
    test('should append 5 elements to our generator', () => {
      const result = append(range(5,10))(range(0, 5))
      expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    test('should append 5 elements to our generator, passing down the "next" values introduced', () => {
      const fed = take<number>(5)(feedMap<number, number>((x:number) => 100 - x, 0))
      const appended = append<number>(feedMap<number, number>((x:number) => x, 5))(fed)
      const result = feed(range(1, 10))(appended)
      expect([...result]).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9]);
    });
    test('should return the return value of the appended generator', () => {
      const result = yieldReturnValue(append<number>(range(5, 10, 1, 0))(range(100, 95)))
      expect([...result]).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9, 0]);
    });
  });
  describe('asynchronous mode', () => {
    test('should append 5 elements to our generator', async () => {
      const result = append(toAsync(range(5, 10)))(toAsync(range(0, 5)))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    test('should append 5 elements to our generator, passing down the "next" values introduced', async () => {
      const fed = take<number>(5)(toAsync(feedMap<number, number>((x:number) => 100 - x, 0)))
      const appended = append<number>(toAsync(feedMap<number, number>((x:number) => x, 5)))(fed)
      const result = feed(toAsync(range(1, 10)))(appended)
      expect(await toArray(result)).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9]);
    });
    test('should return the return value of the appended generator', async () => {
      const result = yieldReturnValue(append<number>(toAsync(range(5, 10, 1, 0)))(toAsync(range(100, 95))))
      expect(await toArray(result)).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9, 0]);
    });
  });
});

import {describe, expect, test} from '@jest/globals';
import { multicast } from '../src/multicast';
import { range } from '../src/range';
import { toArray } from '../src/toArray';
import { toAsync } from '../src/toAsync';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { awaitCall } from '../src/awaitCall';
import { take } from '../src/take';

describe('multicast', () => {
  describe('synchronous mode', () => {
    test('should get two multicasts and they should be independent', () => {
      const [c1, c2]: Generator<number>[] = [...take<Generator<number>>(2)(multicast(range(0, 10)))]

      expect([...c1]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect([...c2]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    test('should replay the history of the generator for a new multicast', () => {
      const multicasted = multicast(range(0, 10))
      const c1 = take<number>(5)(multicasted.next().value)

      expect([...c1]).toEqual([0, 1, 2, 3, 4]);

      const c2 = take<number>(10)(multicasted.next().value)
      expect([...c2]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    test('should get two multicasts and each one of them should return the return value of the original', () => {
      const [c1, c2] = [...take<Generator<number>>(2)(multicast(range(0, 10, 1, 100)))]

      expect([...yieldReturnValue(c1)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
      expect([...yieldReturnValue(c2)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    });
  });
  describe('asynchronous mode', () => {
    test('should get two multicasts and they should be independent', async () => {
      const [c1, c2]: AsyncGenerator<number>[] = [...take<AsyncGenerator<number>>(2)(multicast(toAsync(range(0, 10))))]
  
      expect(await toArray(c1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(await toArray(c2)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    test('should replay the history of the generator for a new multicast', async () => {
      const multicasted = multicast(toAsync(range(0, 10)))
      const c1 = take<number>(5)(multicasted.next().value)
  
      expect(await toArray(c1)).toEqual([0, 1, 2, 3, 4]);
  
      const c2 = take<number>(10)(multicasted.next().value)
      expect(await toArray(c2)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    test('should yield multicasted generators at the same time', async () => {
      const multicasted = multicast(awaitCall(([_, push]) => setTimeout(() => push('value'), 100)))
      const c1 = multicasted.next().value
      const c2 = multicasted.next().value
  
      expect(await Promise.all([c1.next(), c2.next()])).toEqual([{value: 'value', done: false}, {value: 'value', done: false}]);
    });
    test('should get two multicasts and each one of them should return the return value of the original', async () => {
      const [c1, c2] = [...take<AsyncGenerator<number>>(2)(multicast(toAsync(range(0, 10, 1, 100))))]
  
      expect(await toArray(yieldReturnValue(c1))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
      expect(await toArray(yieldReturnValue(c2))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    });
  });
});
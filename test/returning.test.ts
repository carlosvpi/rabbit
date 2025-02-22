import {describe, expect, test} from '@jest/globals';
import { returning } from '../src/returning';
import { range } from '../src/range';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';

describe('returning', () => {
  describe('synchronous mode', () => {
    test('should generate the same as a generator and return the correct value, when the generator returns', () => {
      const result = yieldReturnValue(returning(200)(range(0, 10, 1, 100)))
      expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
    });
    test('should generate the same as a generator and return the correct value, when the generator does not return', () => {
      const result = yieldReturnValue(returning(200)(range(0, 10)))
      expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
    });
  });
  describe('asynchronous mode', () => {
    test('should generate the same as a generator and return the correct value, when the generator returns', async () => {
      const result = yieldReturnValue(returning(200)(toAsync(range(0, 10, 1, 100))))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
    });
    test('should generate the same as a generator and return the correct value, when the generator does not return', async () => {
      const result = yieldReturnValue(returning(200)(toAsync(range(0, 10))))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
    });
  });
});
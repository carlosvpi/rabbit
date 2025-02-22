import {describe, expect, test} from '@jest/globals';
import { toArray } from '../src/toArray';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';

describe('toArray', () => {
  describe('synchronous mode', () => {
    test('should produce an array and return its return value arugment', () => {
      const result = toArray<number | string>(range(0, 4))
      expect(result).toEqual([0, 1, 2, 3]);
    });
  });
  describe('asynchronous mode', () => {
    test('should produce an array and return its return value arugment', async () => {
      const result = toArray<number | string>(toAsync(range(0, 4)))
      expect(await result).toEqual([0, 1, 2, 3]);
    });
  });
});
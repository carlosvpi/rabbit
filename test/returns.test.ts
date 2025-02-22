import {describe, expect, test} from '@jest/globals';
import { range } from '../src/range';
import { returns } from '../src/returns';
import { toAsync } from '../src/toAsync';

describe('returning', () => {
  describe('synchronous mode', () => {
    test('should return the same as the original generator', () => {
      const result = returns(range(0, 10, 1, 100))
      expect(result).toEqual(100);
    });
  });
  describe('asynchronous mode', () => {
    test('should return the same as the original generator', async () => {
      const result = returns(toAsync(range(0, 10, 1, 100)))
      expect(await result).toEqual(100);
    });
  });
});
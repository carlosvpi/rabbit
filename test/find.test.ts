import {describe, expect, test} from '@jest/globals';
import { find } from '../src/find';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { returning } from '../src/returning';

describe('find', () => {
  describe('synchronous mode', () => {
    test('should find the item that fulfils the predicate', () => {
      const result = find((x: number) => x % 5 === 4)(range(0, 5))
      expect(result).toEqual(4);
    });
    test('should return `null` if no item fulfils the predicate', () => {
      const result = find((x: number) => x % 6 === 5)(range(0, 5))
      expect(result).toEqual(null);
    });
    test('should ignore the return value of the generator', () => {
      const result = find((x: number) => x % 6 === 5)(returning<number>(5)(range(0, 5)))
      expect(result).toEqual(null);
    });
  });
  describe('asynchronous mode', () => {
    test('should find the item that fulfils the predicate', async () => {
      const result = find((x: number) => x % 5 === 4)(toAsync(range(0, 5)))
      expect(await result).toEqual(4);
    });
    test('should return `null` if no item fulfils the predicate', async () => {
      const result = find((x: number) => x % 6 === 5)(toAsync(range(0, 5)))
      expect(await result).toEqual(null);
    });
    test('should ignore the return value of the generator', async () => {
      const result = find((x: number) => x % 6 === 5)(returning<number>(5)(toAsync(range(0, 5))))
      expect(await result).toEqual(null);
    });
  });
});
import {describe, expect, test} from '@jest/globals';
import { find } from '../src/find';
import { range } from '../src/range';

describe('find', () => {
  test('should find the item that fulfils the predicate', () => {
    const result = find((x: number) => x % 5 === 4)(range(0, 5))
    expect(result).toEqual(4);
  });
  test('should return `null` if no item fulfils the predicate', () => {
    const result = find((x: number) => x % 6 === 5)(range(0, 5))
    expect(result).toEqual(null);
  });
});
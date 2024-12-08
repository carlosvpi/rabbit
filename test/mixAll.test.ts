import {describe, expect, test} from '@jest/globals';
import { mixAll } from '../src/mixAll';
import { range } from '../src/range';
import { fromArray } from '../src/fromArray';

describe('mixAll', () => {
  test('should mix two generators', () => {
    const result = mixAll<string|number, any>(fromArray(['a', 'b', 'c']), range(0, 4))
    expect([...result]).toEqual([['a', 0], ['b', 1], ['c', 2], [undefined, 3]]);
  });
  test('should mix three generators', () => {
    const result = mixAll<string|number, any>(fromArray(['a', 'b', 'c']), range(0, 4), fromArray([1, 1, 2, 5, 7]))
    expect([...result]).toEqual([['a', 0, 1], ['b', 1, 1], ['c', 2, 2], [undefined, 3, 5], [undefined, undefined, 7]]);
  });
});
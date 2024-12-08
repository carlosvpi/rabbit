import {describe, expect, test} from '@jest/globals';
import { mixRace } from '../src/mixRace';
import { range } from '../src/range';
import { fromArray } from '../src/fromArray';

describe('mixRace', () => {
  test('should mix two generators until the first ends', () => {
    const result = mixRace<string|number, any>(fromArray(['a', 'b', 'c']), range(0, 4))
    expect([...result]).toEqual([['a', 0], ['b', 1], ['c', 2]]);
  });
  test('should mix three generators until the first ends', () => {
    const result = mixRace<string|number, any>(fromArray(['a', 'b', 'c']), range(0, 4), fromArray([1, 1, 2, 5, 7]))
    expect([...result]).toEqual([['a', 0, 1], ['b', 1, 1], ['c', 2, 2]]);
  });
});
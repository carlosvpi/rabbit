import {describe, expect, test} from '@jest/globals';
import { head } from '../src/head';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('tap', () => {
  test('should yield the returning value of the generator', () => {
    const result = yieldReturnValue(range(0, 5, 1, 100))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should pass down the next values', () => {
    const result = feed(range(1))(yieldReturnValue(head(5, 100)(feedMap((x: number) => x * 2, 0))))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 100]);
  });
});
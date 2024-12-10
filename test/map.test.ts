import {describe, expect, test} from '@jest/globals';
import { map } from '../src/map';
import { range } from '../src/range';
import { pipe } from '../src/pipe';
import { feed } from '../src/feed';
import { returning } from '../src/returning';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('map', () => {
  test('should double elements', () => {
    const result = map((x: number) => x * 2)(range(0, 10))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
  test('should pass down the `next` elements', () => {
    const result = pipe(
      feed(range(1, 10)),
      map<number, number>((x: number) => x + 1),
    )(feedMap((x:number) => x * 2, 0))
    expect([...result]).toEqual([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
  });
  test('should take into account index and next', () => {
    const result = pipe(
      map<number, number>((x: number, i: number, n: number) => 2**x + 3**i + 5**(n ?? 0)),
      feed(range(1, 10)),
    )(feedMap((x:number) => x * 2, 0))
    expect([...result]).toEqual([3,12,50,216,962,4392,20450,96696,462722,2234952]);
  });
  test('should return the same as the original', () => {
    const result = pipe(
      returning(100),
      map<number, number>((x: number) => x * 2),
      yieldReturnValue,
    )(range(0, 10))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 100]);
  });
});
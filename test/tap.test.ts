import {describe, expect, test} from '@jest/globals';
import { tap } from '../src/tap';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('tap', () => {
  test('should accummulate elements', () => {
    let acc = 0
    const result = tap((x: number) => acc += x)(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(acc).toEqual(45);
  });
  test('should return the same as the generator', () => {
    const result = yieldReturnValue(tap((x: number) => {})(range(0, 10, 1, 100)))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
  });
  test('should pass down the `next` value', () => {
    const result = feed(range(1, 10))(tap((x: number) => {})(feedMap((x: number) => x * 2, 0)))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
  test('should take next and index into account', () => {
    let acc = []
    const result = feed(range(11, 20))(tap((x: number, i: number, n: number) => {acc.push([x, i, n])})(feedMap((x: number) => x * 2, 10)));
    expect([...result]).toEqual([20, 22, 24, 26, 28, 30, 32, 34, 36, 38]);
    expect(acc).toEqual([
      [ 20, 0, undefined ],
      [ 22, 1, 11 ],
      [ 24, 2, 12 ],
      [ 26, 3, 13 ],
      [ 28, 4, 14 ],
      [ 30, 5, 15 ],
      [ 32, 6, 16 ],
      [ 34, 7, 17 ],
      [ 36, 8, 18 ],
      [ 38, 9, 19 ]
    ]);
  });
});
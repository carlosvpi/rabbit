import {describe, expect, test} from '@jest/globals';
import { flatMap } from '../src/flatMap';
import { range } from '../src/range';
import { pipe } from '../src/pipe';
import { feedMap } from '../src/feedMap';
import { take } from '../src/take';
import { feed } from '../src/feed';
import { returning } from '../src/returning';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('flatMap', () => {
  test('should give numbers in ranges from 0 onwards', () => {
    const result = flatMap((x: number) => range(0, x))(range(0, 5))
    expect([...result]).toEqual([0, 0, 1, 0, 1, 2, 0, 1, 2, 3]);
  });
  test('should pass down the next values to the children', () => {
    const result = pipe(
      feed(range(2, 10)),
      flatMap((x: number) => range(0, x)),
      take<number>(16),
    )(feedMap<number, number>((x: number) => x * 2, 1))
    expect([...result]).toEqual([0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3]);
  });
  test('should return the final return value followed by the children return values', () => {
    const result = pipe(
      returning<number>(1000),
      flatMap<number,number>((x: number, i: number) => returning<number>(i * 100)(range(0, x))),
      yieldReturnValue,
    )(range(0, 5))
    expect([...result]).toEqual([0, 0, 1, 0, 1, 2, 0, 1, 2, 3, [1000, 0, 100, 200, 300, 400]]);
  });
});
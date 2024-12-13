import {describe, expect, test} from '@jest/globals';
import { reduce } from '../src/reduce';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { take } from '../src/take';
import { pipe } from '../src/pipe';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('reduce', () => {
  test('should add up the elements of a generator', () => {
    const result = reduce((acc: number, x: number) => acc + x, 100)(range(0, 10))
    expect([...result]).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145]);
  });
  test('should return the return value of the generator', () => {
    const result = yieldReturnValue(reduce((acc: number, x: number) => acc + x, 100)(range(0, 10, 1, 200)))
    expect([...result]).toEqual([100, 101, 103, 106, 110, 115, 121, 128, 136, 145, 200]);
  });
  test('should pass down the `next` value and add up the elements of a generator', () => {
    const result = pipe(
      reduce((acc: number, x: number) => acc + x, 100),
      feed(range(1)),
      take(10)
    )(feedMap((x: number) => x * 2, 0))
    expect([...result]).toEqual([100, 102, 106, 112, 120, 130, 142, 156, 172, 190]);
  });
});
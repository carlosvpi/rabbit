import {describe, expect, test} from '@jest/globals';
import { returningMap } from '../src/returningMap';
import { range } from '../src/range';
import { pipe } from '../src/pipe';
import { feed } from '../src/feed';
import { head } from '../src/head';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('returningMap', () => {
  test('should generate the same as a generator and return the correct value, when the generator returns', () => {
    const result = yieldReturnValue(returningMap(() => 200)(range(0, 10, 1, 100)))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
  });
  test('should generate the same as a generator and return the correct value, when the generator does not return', () => {
    const result = yieldReturnValue(returningMap(() => 200)(range(0, 10)))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
  });
  test('should pass down the `next` values, and take into account the length and the `next` values', () => {
    const result = pipe(
      head(5, 10),
      returningMap((returnValue, index, next) => 2**returnValue + 3**index + 5**next),
      feed(range(1)),
      yieldReturnValue,
    )(feedMap((x: number) => x * 2, 0))
    expect([...result]).toEqual([0, 2, 4, 6, 8, [4392, null]]);
  });
});
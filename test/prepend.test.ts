import {describe, expect, test} from '@jest/globals';
import { prepend } from '../src/prepend';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { range } from '../src/range';
import { take } from '../src/take';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('prepend', () => {
  test('should prepend 5 elements to our generator', () => {
    const result = prepend(range(0, 5))(range(5, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should prepend 5 elements to our generator, passing down the "next" values introduced', () => {
    // fed is the first 5 items of a feedMap
    const fed = take<number>(5)(feedMap<number, number>((x:number) => 100 - x, 0))
    // We prepend another feedMap
    const appended = prepend<number>(fed)(feedMap<number, number>((x:number) => x, 5))
    // We feed the result the range 1 to 10. They go to "fed" (which is only 5 items long) and, then, to the appended feedMap
    const result = feed(range(1, 10))(appended)
    expect([...result]).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9]);
  });
  test('should return the return value of the appended generator', () => {
    // we apppend a range with return value of 0
    const result = yieldReturnValue(prepend<number>(range(100, 95))(range(5, 10, 1, 0)))
    expect([...result]).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9, 0]);
  });
});
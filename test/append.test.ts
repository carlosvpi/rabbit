import {describe, expect, test} from '@jest/globals';
import { append } from '../src/append';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { range } from '../src/range';
import { head } from '../src/head';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('append', () => {
  test('should append 5 elements to our generator', () => {
    const result = append(range(5,10))(range(0, 5))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should append 5 elements to our generator, passing down the "next" values introduced', () => {
    // fed is the first 5 items of a feedMap
    const fed = head<number>(5)(feedMap<number, number>((x:number) => 100 - x, 0))
    // We append another feedMap
    const appended = append<number>(feedMap<number, number>((x:number) => x, 5))(fed)
    // We feed the result the range 1 to 10. They go to "fed" (which is only 5 items long) and, then, to the appended feedMap
    const result = feed(range(1, 10))(appended)
    expect([...result]).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9]);
  });
  test('should return the return value of the appended generator', () => {
    // we apppend a range with return value of 0
    const result = yieldReturnValue(append<number>(range(5, 10, 1, 0))(range(100, 95)))
    expect([...result]).toEqual([100, 99, 98, 97, 96, 5, 6, 7, 8, 9, 0]);
  });
});
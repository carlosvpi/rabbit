import {describe, expect, test} from '@jest/globals';
import { every } from '../src/every';
import { range } from '../src/range';
import { feedMap } from '../src/feedMap';
import { feed } from '../src/feed';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { fromArray } from '../src/fromArray';

describe('every', () => {
  test('should generate 3 trues and 1 false, when a value is found', () => {
    const result = every((x: number) => x % 2 !== 0)(fromArray([1, 3, 5, 6, 8, 10]))
    expect([...result]).toEqual([true, true, true, false]);
  });
  test('should generate 5 trues when no value is found', () => {
    const result = every((x: number) => x % 2 !== 0)(fromArray([1, 3, 5, 7, 9]))
    expect([...result]).toEqual([true, true, true, true, true]);
  });
  test('should generate 4 trues and a false, passing down the `next` value', () => {
    const result = feed(range(1, 10))(every((x: number) => x <= 7)(feedMap((x: number) => x * 2, 0)))
    expect([...result]).toEqual([true, true, true, true, false]);
  });
  test('should return the element that fulfils the predicate', () => {
    const result = yieldReturnValue(every((x: number) => x % 2 !== 0)(fromArray([1, 3, 5, 6, 9], 100)))
    expect([...result]).toEqual([true, true, true, false, 6]);
  });
  test('should return null if no event fulfils the predicate, irrespective of the return value of g', () => {
    const result = yieldReturnValue(every((x: number) => x % 2 !== 0)(fromArray([1, 3, 5, 7, 9], 100)))
    expect([...result]).toEqual([true, true, true, true, true, 100]);
  });
  test('should take into account the index and next of the element emitted', () => {
    const result = feed(range(11, 20))(every((x: number, i: number, n: number) => x !== 36 || i !== 8 || n !== 18)(feedMap((x: number) => x * 2, 10)))
    expect([...result]).toEqual([true, true, true, true, true, true, true, true, false]);
  });
});
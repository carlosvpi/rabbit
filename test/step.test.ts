import {describe, expect, test} from '@jest/globals';
import { step } from '../src/step';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('step', () => {
  test('should step 1 if no number provided', () => {
    const result = step()(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('should step 2 by 2 elements', () => {
    const result = step(2)(range(0, 10))
    expect([...result]).toEqual([0, 2, 4, 6, 8]);
  });
  test('should return the same as `g` if no return value specified', () => {
    const result = yieldReturnValue(step(2)(range(0, 10, 1, 100)))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 100]);
  });
  test('should return the specified value even if `g` returns a value', () => {
    const result = yieldReturnValue(step(2, 200)(range(0, 10, 1, 100)))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 200]);
  });
  test('should pass down the `next` value', () => {
    const result = feed(range(1, 10))(step(5)(feedMap((x: number) => x * 2, 0)))
    expect([...result]).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
});
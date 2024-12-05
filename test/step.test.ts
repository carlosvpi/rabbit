import {describe, expect, test} from '@jest/globals';
import { step } from '../src/step';
import { range } from '../src/range';

describe('step', () => {
  test('should give the same generation when no distance given', () => {
    const result = step()(range(0, 6))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5]);
  });
  test('should step two when distance is 2', () => {
    const result = step(2)(range(0, 5))
    expect([...result]).toEqual([0, 2, 4]);
  });
});
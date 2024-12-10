import {describe, expect, test} from '@jest/globals';
import { fromArray } from '../src/fromArray';
import { returning } from '../src/returning';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('fromArray', () => {
  test('should transform an array into a generator', () => {
    const array = [1,2,3,4,5,6,7,8,9,0]
    expect([...fromArray(array)]).toEqual(array);
  });
  test('should return the specified value', () => {
    const array = [1,2,3,4,5,6,7,8,9]
    expect([...yieldReturnValue(returning(0)(fromArray(array)))]).toEqual([...array, 0]);
  });
});
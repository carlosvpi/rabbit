import {describe, expect, test} from '@jest/globals';
import { fromArray } from '../src/fromArray';

describe('fromArray', () => {
  test('should transform an array into a generator', () => {
    const array = [1,2,3,4,5,6,7,8,9,0]
    expect([...fromArray(array)]).toEqual(array);
  });
});
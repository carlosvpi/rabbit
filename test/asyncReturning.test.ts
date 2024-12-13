import {describe, expect, test} from '@jest/globals';
import { asyncReturning } from '../src/asyncReturning';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncReturning', () => {
  test('should generate the same as a generator and return the correct value, when the generator returns', async () => {
    const result = asyncYieldReturnValue(asyncReturning(200)(toAsync(range(0, 10, 1, 100))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
  });
  test('should generate the same as a generator and return the correct value, when the generator does not return', async () => {
    const result = asyncYieldReturnValue(asyncReturning(200)(toAsync(range(0, 10))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200]);
  });
});
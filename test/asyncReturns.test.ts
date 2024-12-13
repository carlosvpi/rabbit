import {describe, expect, test} from '@jest/globals';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncReturns } from '../src/asyncReturns';

describe('returning', () => {
  test('should return the same as the original generator', async () => {
    const result = asyncReturns(toAsync(range(0, 10, 1, 100)))
    expect(await result).toEqual(100);
  });
});
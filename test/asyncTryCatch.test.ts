import {describe, expect, test} from '@jest/globals';
import { asyncTryCatch } from '../src/asyncTryCatch';
import { range } from '../src/range';
import { asyncFeed } from '../src/asyncFeed';
import { asyncToArray } from '../src/asyncToArray';
import { toAsync } from '../src/toAsync';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncTryCatch', () => {
  async function* yieldsErrors (errors: boolean) {
    const x = yield await Promise.resolve(1)
    yield  await Promise.resolve(x ?? 2)
    if (errors) throw new Error('My error 1')
    yield await Promise.resolve(3)
    if (errors) throw new Error('My error 2')
    yield  await Promise.resolve(4)
    return 5
  }
  test('should catch the error and return it', async () => {
    const result = asyncYieldReturnValue(asyncTryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(true)))
    expect(await asyncToArray(result)).toEqual([1, 2, [null, 'Found error: My error 1']]);
  });
  test('should generate the same items and return the same thing if no errors', async () => {
    const result = asyncYieldReturnValue(asyncTryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(false)))
    expect(await asyncToArray(result)).toEqual([1, 2, 3, 4, [5, null]]);
  });
  test('should pass next values to the original generator', async () => {
    const result = asyncFeed(toAsync(range(1, 6)))(asyncYieldReturnValue(asyncTryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(false))))
    expect(await asyncToArray(result)).toEqual([1, 1, 3, 4, [5, null]]);
  });
});
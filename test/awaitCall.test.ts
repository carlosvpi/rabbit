import {describe, expect, test} from '@jest/globals';
import { awaitCall } from '../src/awaitCall';
import { asyncToArray } from '../src/asyncToArray';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { asyncFeed } from '../src/asyncFeed';
import { toAsync } from '../src/toAsync';
import { fromArray } from '../src/fromArray';

describe('awaitCall', () => {
  test('should call awaitCall and emit a few items until returning what is passed to "end"', async () => {
    const result = awaitCall((next, end) => {
      next(1)
      next(2)
      setTimeout(() => next(4), 0)
      next(3)
      setTimeout(() => end('End'), 10)
      setTimeout(() => next(5), 50)
    })
    expect(await asyncToArray(asyncYieldReturnValue(result))).toEqual([1, 2, 3, 4, 'End']);
  });
  test('should pass down the "next" and allow to operate with it', async () => {
    const caller = awaitCall(async (next, end) => {
      const x = await next(0)
      const y = await next(2**x)
      next(3**y)
    })
    const result = asyncFeed(toAsync(fromArray([3, 5])))(caller)
    expect(await asyncToArray(result)).toEqual([0, 8, 243]);
  });
});
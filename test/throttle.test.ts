import {describe, expect, test} from '@jest/globals';
import { throttle } from '../src/throttle';
import { awaitCall } from '../src/awaitCall';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toArray } from '../src/toArray';

function wait(ms: number): Promise<void> {
  return new Promise(r => setTimeout(() => r(), ms))
}

describe('throttle', () => {
  test('should throttle a series of events', async () => {
    const result = throttle(10)(awaitCall(async ([gen, push, stop]) => {
      push(1)
      push(2)
      await wait(20)
      push(3)
      await wait(5)
      push(4)
      await wait(20)
      push(5)
      await wait(20)
      stop(100)
      return gen
    }))
    expect(await toArray(yieldReturnValue(result))).toEqual([1, 3, 5, 100]);
  });
});
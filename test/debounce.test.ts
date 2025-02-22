import {describe, expect, test} from '@jest/globals';
import { debounce } from '../src/debounce';
import { awaitCall } from '../src/awaitCall';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toArray } from '../src/toArray';

function wait(ms: number): Promise<void> {
  return new Promise(r => setTimeout(() => r(), ms))
}

describe('debounce', () => {
  test('should debounce a series of events', async () => {
    const result = debounce(10)(awaitCall(async ([gen, push, stop]) => {
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
    expect(await toArray(yieldReturnValue(result))).toEqual([2, 4, 5, 100]);
  });
});
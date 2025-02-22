import {describe, expect, test} from '@jest/globals';
import { Caller, awaitCall } from '../src/awaitCall';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('awaitCall', () => {
  test('should call awaitCall and emit a few items until returning what is passed to "end"', async () => {
    const [result, push, stop]: Caller<number, string> = await new Promise(awaitCall)
    push(1)
    push(2)
    setTimeout(() => push(4), 0)
    push(3)
    setTimeout(() => stop('End'), 10)
    setTimeout(() => push(5), 50)
    expect(await toArray(yieldReturnValue(result))).toEqual([1, 2, 3, 4, 'End']);
  });
  test('should yield every push before the stop', async () => {
    const g = awaitCall(async ([_, push, stop]) => {
      push(1)
      const x = await push(2)
      stop(`End with ${x}`)
    })
    const result: (number|string)[] = []
    result.push((await g.next(10)).value)
    result.push((await g.next(11)).value)
    result.push((await g.next(12)).value)
    expect(result).toEqual([1, 2, 'End with 12']);
  });
  test('should pass down the "next" and allow to operate with it', async () => {
    const [generator, push, stop]: Caller<number, string> = await new Promise(awaitCall)
    ;(async function () {
      await push(0)
      const x = await push(1)
      push(2**x)
      const y = await push(3**x)
      push(5**y)
      stop('End')
      push(7**y)
    })()
    const result: IteratorResult<number, string>[] = []
    result.push(await generator.next())
    result.push(await generator.next(2))
    result.push(await generator.next(3))
    result.push(await generator.next(5))
    result.push(await generator.next(7))
    result.push(await generator.next(11))

    expect(result).toEqual([
      { value: 0, done: false },
      { value: 1, done: false },
      { value: 8, done: false },
      { value: 27, done: false },
      { value: 78125, done: false },
      { value: "End", done: true }
    ]); 
  });
});
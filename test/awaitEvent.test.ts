import {describe, expect, test} from '@jest/globals';
import { awaitEvent } from '../src/awaitEvent';
import { toArray } from '../src/toArray';
import { yieldReturnValue } from '../src/yieldReturnValue';

describe('awaitEvent', () => {
  const target = {
    listeners: new Set<(_: number) => void>([]),
    emit: (v: number) => {
      target.listeners.forEach(listener => listener(v))
    },
    addEventListener: (_: string, f: (_: number) => void) => {
      target.listeners.add(f)
    },
    removeEventListener: (_: string, f: (_: number) => void) => {
      target.listeners.delete(f)
    }
  }
  const wait = (ms, v) => new Promise(r => setTimeout(() => r(v), ms))
  test('should emit 5 events and end with "Finish"', async () => {
    const result = awaitEvent(target, 'eventName', {}, (stop, _0, i?: number) => {if (i === 5) stop('End')})
    setTimeout(() => {
      target.emit(1)
      target.emit(4)
      target.emit(8)
      target.emit(3)
      target.emit(7)
      target.emit(9)
      target.emit(13)
      target.emit(14)
    }, 0)
    expect(await toArray(yieldReturnValue(result))).toEqual([1, 4, 8, 3, 7, 9, 'End']);
  });
  test('should emit 5 events and end with "Finish", asynchronously', async () => {
    let s
    const result = awaitEvent(target, 'eventName', {}, (stop, e, i) => {s = stop})
    ;(async () => {
      await wait(100, null)
      target.emit(1)
      await wait(100, null)
      target.emit(8)
      await wait(100, null)
      target.emit(4)
      await wait(100, null)
      target.emit(3)
      await wait(100, null)
      target.emit(7)
      await wait(100, null)
      s('Finish')
      await wait(100, null)
      target.emit(9)
      await wait(100, null)
      target.emit(13)
      await wait(100, null)
    })()
    expect(await toArray(yieldReturnValue(result))).toEqual([1, 8, 4, 3, 7, 'Finish'])
  });
  test('should return before start', () => {
    const result = awaitEvent(target, 'eventName', stop => stop('Finish'))
    setTimeout(async () => {
      target.emit(1)
      target.emit(4)
      target.emit(8)
      target.emit(3)
      target.emit(7)
      target.emit(9)
      target.emit(13)
      target.emit(14)
      expect(await toArray(yieldReturnValue(result))).toEqual(['Finish']);
    }, 0)
  });
});
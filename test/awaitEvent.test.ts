import {describe, expect, test} from '@jest/globals';
import { awaitEvent } from '../src/awaitEvent';
import { asyncToArray } from '../src/asyncToArray';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

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
  test('should emit 5 events and end with "Finish"', () => {
    const result = awaitEvent(target, 'eventName', (stop, _0, i: number) => {i === 5 && stop('Finish')})
    setTimeout(async () => {
      target.emit(1)
      target.emit(4)
      target.emit(8)
      target.emit(3)
      target.emit(7)
      target.emit(9)
      target.emit(13)
      target.emit(14)
      expect(await asyncToArray(asyncYieldReturnValue(result))).toEqual([1, 4, 8, 3, 7, 'Finish']);
    }, 0)
  });
});
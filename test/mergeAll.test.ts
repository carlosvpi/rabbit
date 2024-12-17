import {describe, expect, test} from '@jest/globals';
import { mergeAll } from '../src/mergeAll';
import { asyncToArray } from '../src/asyncToArray';
import { asyncReturns } from '../src/asyncReturns';
import { toAsync } from '../src/toAsync';
import { fromArray } from '../src/fromArray';
import { awaitCall } from '../src/awaitCall';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('mergeAll', () => {
  test('should mergeAll two async generators when their values come at the same time', async () => {
    const result = mergeAll(toAsync(fromArray(['a', 'b', 'c'])), toAsync(fromArray(['d', 'e', 'f'])))
    expect(await asyncToArray(result)).toEqual(['a', 'd', 'b', 'e', 'c', 'f']);
  });
  test('should mergeAll two async generators when their values come at different times', async () => {
    const result = mergeAll(awaitCall((push, stop) => {
      push(0)
      setTimeout(() => push(2), 20)
      setTimeout(() => push(4), 40)
      setTimeout(() => push(6), 60)
      setTimeout(() => stop('End 1'), 80)
    }), awaitCall((push, stop) => {
      setTimeout(() => push(1), 10)
      setTimeout(() => push(3), 30)
      setTimeout(() => push(5), 50)
      setTimeout(() => push(7), 70)
      setTimeout(() => push(9), 90)
      setTimeout(() => stop('End 2'), 110)
    }))
    expect(await asyncToArray(asyncYieldReturnValue(result))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 9, ['End 1', 'End 2']]);
  });
  test('should yield all generated items', async () => {
    const result = mergeAll(toAsync(fromArray(['a', 'b', 'c'], 'X')), toAsync(fromArray(['d', 'e', 'f', 'g', 'h'], 'Y')))
    expect(await asyncToArray(result)).toEqual(['a', 'd', 'b', 'e', 'c', 'f', 'g', 'h']);
  });
  test('should return the return value of the first finishing generator', async () => {
    const result = mergeAll(toAsync(fromArray(['a', 'b', 'c'], 'A')), toAsync(fromArray(['d', 'e', 'f', 'g'], 'B')))
    expect(await asyncReturns(result)).toEqual(['A', 'B']);
  });
});

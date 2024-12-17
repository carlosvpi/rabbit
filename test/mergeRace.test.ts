import {describe, expect, test} from '@jest/globals';
import { mergeRace } from '../src/mergeRace';
import { asyncToArray } from '../src/asyncToArray';
import { asyncReturns } from '../src/asyncReturns';
import { toAsync } from '../src/toAsync';
import { fromArray } from '../src/fromArray';
import { awaitCall } from '../src/awaitCall';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('mergeRace', () => {
  test('should merge two async generators', async () => {
    const result = mergeRace(toAsync(fromArray(['a', 'b', 'c'])), toAsync(fromArray(['d', 'e', 'f'])))
    expect(await asyncToArray(result)).toEqual(['a', 'd', 'b', 'e', 'c', 'f']);
  });
  test('should merge two async generators when their values come at different times', async () => {
    const result = mergeRace(awaitCall((push, stop) => {
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
    expect(await asyncToArray(asyncYieldReturnValue(result))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 'End 1']);
  });
  test('should yield all generated items until someone returns', async () => {
    const result = mergeRace(toAsync(fromArray(['a', 'b', 'c'], 'X')), toAsync(fromArray(['d', 'e', 'f', 'g', 'h'], 'Y')))
    expect(await asyncToArray(result)).toEqual(['a', 'd', 'b', 'e', 'c', 'f']);
  });

  test('should return the return value of the first finishing generator', async () => {
    const result = mergeRace(toAsync(fromArray(['a', 'b', 'c'], 'A')), toAsync(fromArray(['d', 'e', 'f'], 'B')))
    expect(await asyncReturns(result)).toEqual('A');
  });
});

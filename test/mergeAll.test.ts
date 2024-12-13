import {describe, expect, test} from '@jest/globals';
import { mergeAll } from '../src/mergeAll';
import { asyncToArray } from '../src/asyncToArray';
import { asyncReturns } from '../src/asyncReturns';
import { toAsync } from '../src/toAsync';
import { fromArray } from '../src/fromArray';

describe('mergeAll', () => {
  test('should mergeAll two async generators', async () => {
    const result = mergeAll(toAsync(fromArray(['a', 'b', 'c'])), toAsync(fromArray(['d', 'e', 'f'])))
    expect(await asyncToArray(result)).toEqual(['a', 'd', 'b', 'e', 'c', 'f']);
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

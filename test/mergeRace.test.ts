import {describe, expect, test} from '@jest/globals';
import { mergeRace } from '../src/mergeRace';
import { asyncToArray } from '../src/asyncToArray';
import { asyncReturns } from '../src/asyncReturns';
import { toAsync } from '../src/toAsync';
import { fromArray } from '../src/fromArray';

describe('mergeRace', () => {
  test('should mergeRace two async generators', async () => {
    const result = mergeRace(toAsync(fromArray(['a', 'b', 'c'])), toAsync(fromArray(['d', 'e', 'f'])))
    expect(await asyncToArray(result)).toEqual(['a', 'd', 'b', 'e', 'c', 'f']);
  });
  test('should return the return value of the first finishing generator', async () => {
    const result = mergeRace(toAsync(fromArray(['a', 'b', 'c'], 'A')), toAsync(fromArray(['d', 'e', 'f'], 'B')))
    expect(await asyncReturns(result)).toEqual('A');
  });
});

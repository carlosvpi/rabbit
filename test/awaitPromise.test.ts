import {describe, expect, test} from '@jest/globals';
import { awaitPromise } from '../src/awaitPromise';
import { asyncToArray } from '../src/asyncToArray';

describe('awaitPromise', () => {
  test('should awaitPromise 5 elements to our generator', async () => {
    const result = awaitPromise(i => Promise.resolve(i), (stop, _0, i) => {i === 10 && stop()})
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { awaitPromise } from '../src/awaitPromise';
import { toArray } from '../src/toArray';

describe('awaitPromise', () => {
  test('should awaitPromise 5 elements to our generator', async () => {
    const result = awaitPromise(i => Promise.resolve(i), (stop, each) => {each((_, i) => i === 10 && stop())});
    expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
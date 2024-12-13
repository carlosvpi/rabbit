import {describe, expect, test} from '@jest/globals';
import { awaitInterval } from '../src/awaitInterval';
import { asyncToArray } from '../src/asyncToArray';
import { asyncLast } from '../src/asyncLast';
import { asyncDrop } from '../src/asyncDrop';
import { asyncMap } from '../src/asyncMap';
import { asyncReturns } from '../src/asyncReturns';

describe('awaitInterval', () => {
  test('should awaitInterval 5 elements to our generator', async () => {
    const result = asyncDrop<number>(1)(asyncMap(([a, b]: number[]) => b - a)(asyncLast<number>(2)(awaitInterval(10, (stop, _, i) => {i === 10 && stop()}))))
    const diffs: number[] = await asyncToArray(result)
    expect(diffs.every((diff: number) => diff < 20)).toBe(true)
  });
  test('should awaitInterval 5 elements to our generator', async () => {
    const result = await asyncReturns(awaitInterval(10, (stop, _, i) => {i === 10 && stop(100)}))
    expect(result).toBe(100)
  });
});
import {describe, expect, test} from '@jest/globals';
import { asyncTake } from '../src/asyncTake';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('tap', () => {
  test('should yield the returning value of the generator', async () => {
    const result = asyncYieldReturnValue(toAsync(range(0, 5, 1, 100)))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 100]);
  });
  test('should pass down the next values', async () => {
    const result = asyncFeed(toAsync(range(1)))(asyncYieldReturnValue(asyncTake(5, 100)(toAsync(feedMap((x: number) => x * 2, 0)))))
    expect(await asyncToArray(result)).toEqual([0, 2, 4, 6, 8, 100]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { asyncTagFeed } from '../src/asyncTagFeed';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncFeed } from '../src/asyncFeed';
import { asyncTake } from '../src/asyncTake';
import { feedMap } from '../src/feedMap';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';

describe('asyncTagFeed', () => {
  test('should generate pairs [element, next]', async () => {
    const g = asyncTagFeed(toAsync(feedMap((x: number) => x * 2, 0)))
    const result = asyncFeed(toAsync(range(0, 10)))(g)
    expect(await asyncToArray(result)).toEqual([
      [ 0, undefined ],
      [ 0, 0 ],
      [ 2, 1 ],
      [ 4, 2 ],
      [ 6, 3 ],
      [ 8, 4 ],
      [ 10, 5 ],
      [ 12, 6 ],
      [ 14, 7 ],
      [ 16, 8 ],
      [ 18, 9 ]
    ]);
  });
  test('should return [returnValue, next]', async () => {
    const g = asyncYieldReturnValue(asyncTagFeed(asyncTake(5, 100)(toAsync(feedMap((x: number) => x * 2, 0)))))
    const result = asyncFeed(toAsync(range(0, 10)))(g)
    expect(await asyncToArray(result)).toEqual([
      [ 0, undefined ],
      [ 0, 0 ],
      [ 2, 1 ],
      [ 4, 2 ],
      [ 6, 3 ],
      [ 100, 4]
    ]);
  });
});
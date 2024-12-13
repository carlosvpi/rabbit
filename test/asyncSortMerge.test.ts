import {describe, expect, test} from '@jest/globals';
import { asyncSortMerge } from '../src/asyncSortMerge';
import { asyncYieldReturnValue } from '../src/asyncYieldReturnValue';
import { asyncFeed } from '../src/asyncFeed';
import { feedMap } from '../src/feedMap';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';

describe('asyncSortMerge', () => {
  test('should concat two sorted generators keeping the output sorted and return each values', async () => {
    const result = asyncYieldReturnValue(asyncSortMerge(toAsync(range(0, 10, 2, 200)), (a, b) => a - b)(toAsync(range(1, 11, 2, 100))))
    expect(await asyncToArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, [100, 200]]);
  });
  test('should pass down the `next` values', async () => {
    const gen1 = feedMap<(string | number)[], number>((x: number) => ['g', x * 2], 4)
    const gen2 = feedMap<(string | number)[], number>((x: number) => ['h', x + 10], 4)
    const sort = (a: (string | number)[], b: (string | number)[]) => (a[1] as number) - (b[1] as number)
    const result = asyncFeed(toAsync(range(5, 20)))(asyncSortMerge<(string | number)[]>(toAsync(gen2), sort)(toAsync(gen1)))
    expect(await asyncToArray(result)).toEqual([["g",8],["g",10],["g",12],["g",14],["h",14],["h",15],["g",16],["h",16],["h",17],["g",18],["h",18],["h",19],["g",20],["h",20],["h",21],["g",22]]);
  });
});
import {describe, expect, test} from '@jest/globals';
import { sortMerge } from '../src/sortMerge';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';
import { range } from '../src/range';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toAsync } from '../src/toAsync';
import { toArray } from '../src/toArray';

describe('sortMerge', () => {
  describe('synchroonous mode', () => {
    test('should concat two sorted generators keeping the output sorted and return each values', () => {
      const result = yieldReturnValue(sortMerge(range(0, 10, 2, 200), (a, b) => a - b)(range(1, 11, 2, 100)))
      expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, [100, 200]]);
    });
    test('should pass down the `next` values', () => {
      const gen1 = feedMap<(string | number)[], number>((x: number) => ['g', x * 2], 4)
      const gen2 = feedMap<(string | number)[], number>((x: number) => ['h', x + 10], 4)
      const sort = (a: (string | number)[], b: (string | number)[]) => (a[1] as number) - (b[1] as number)
      const result = feed(range(5, 20))(sortMerge<(string | number)[]>(gen2, sort)(gen1))
      expect([...result]).toEqual([["g",8],["g",10],["g",12],["g",14],["h",14],["h",15],["g",16],["h",16],["h",17],["g",18],["h",18],["h",19],["g",20],["h",20],["h",21],["g",22]]);
    });
  });
  describe('asynchroonous mode', () => {
    test('should concat two sorted generators keeping the output sorted and return each values', async () => {
      const result = yieldReturnValue(sortMerge(toAsync(range(0, 10, 2, 200)), (a, b) => a - b)(toAsync(range(1, 11, 2, 100))))
      expect(await toArray(result)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, [100, 200]]);
    });
    test('should pass down the `next` values', async () => {
      const gen1 = feedMap<(string | number)[], number>((x: number) => ['g', x * 2], 4)
      const gen2 = feedMap<(string | number)[], number>((x: number) => ['h', x + 10], 4)
      const sort = (a: (string | number)[], b: (string | number)[]) => (a[1] as number) - (b[1] as number)
      const result = feed(toAsync(range(5, 20)))(sortMerge<(string | number)[]>(toAsync(gen2), sort)(toAsync(gen1)))
      expect(await toArray(result)).toEqual([["g",8],["g",10],["g",12],["g",14],["h",14],["h",15],["g",16],["h",16],["h",17],["g",18],["h",18],["h",19],["g",20],["h",20],["h",21],["g",22]]);
    });
  });
});

import {describe, expect, test} from '@jest/globals';
import { tagFeed } from '../src/tagFeed';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { take } from '../src/take';
import { feedMap } from '../src/feedMap';
import { toAsync } from '../src/toAsync';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toArray } from '../src/toArray';

describe('tagFeed', () => {
  describe('synchronous mode', () => {
    test('should generate pairs [element, next]', () => {
      const g = tagFeed(feedMap((x: number) => x * 2, 0))
      const result = feed(range(0, 10))(g)
      expect([...result]).toEqual([
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
    test('should return [returnValue, next]', () => {
      const g = yieldReturnValue(tagFeed(take(5, 100)(feedMap((x: number) => x * 2, 0))))
      const result = feed(range(0, 10))(g)
      expect([...result]).toEqual([
        [ 0, undefined ],
        [ 0, 0 ],
        [ 2, 1 ],
        [ 4, 2 ],
        [ 6, 3 ],
        [ 100, 4]
      ]);
    });
  });
  describe('asynchronous mode', () => {
    test('should generate pairs [element, next]', async () => {
      const g = tagFeed(toAsync(feedMap((x: number) => x * 2, 0)))
      const result = feed(toAsync(range(0, 10)))(g)
      expect(await toArray(result)).toEqual([
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
      const g = yieldReturnValue(tagFeed(take(5, 100)(toAsync(feedMap((x: number) => x * 2, 0)))))
      const result = feed(toAsync(range(0, 10)))(g)
      expect(await toArray(result)).toEqual([
        [ 0, undefined ],
        [ 0, 0 ],
        [ 2, 1 ],
        [ 4, 2 ],
        [ 6, 3 ],
        [ 100, 4]
      ]);
    });
  });
});
import {describe, expect, test} from '@jest/globals';
import { tagFeed } from '../src/tagFeed';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { feedMap } from '../src/feedMap';

describe('tagFeed', () => {
  test('should return tuples of 3 elements', () => {
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
});
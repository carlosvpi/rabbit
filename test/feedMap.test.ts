import {describe, expect, test} from '@jest/globals';
import { feedMap } from '../src/feedMap';
import { take } from '../src/take';
import { pipe } from '../src/pipe';
import { feed } from '../src/feed';
import { range } from '../src/range';

describe('feedMap', () => {
  test('should double its next params', () => {
    const result = pipe(feed(range(5, 10)), take(6))(feedMap(x => 2 * x, 0))
    expect([...result]).toEqual([0, 10, 12, 14, 16, 18]);
  });
});
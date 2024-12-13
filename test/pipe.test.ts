import {describe, expect, test} from '@jest/globals';
import { pipe } from '../src/pipe';
import { range } from '../src/range';
import { filter } from '../src/filter';
import { drop } from '../src/drop';
import { map } from '../src/map';
import { takeWhile } from '../src/takeWhile';

describe('pipe', () => {
  test('should pipe a generator through a series of constructors', () => {
    const result = pipe<number>(drop(10), filter((x: number) => x % 5 === 0), map((x: number) => x * 2), takeWhile((x: number) => x < 80))(range(0, 100))
    expect([...result]).toEqual([20, 30, 40, 50, 60, 70]);
  });
});

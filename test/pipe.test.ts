import {describe, expect, test} from '@jest/globals';
import { pipe } from '../src/pipe';
import { range } from '../src/range';
import { filter } from '../src/filter';
import { skip } from '../src/skip';
import { map } from '../src/map';
import { headWhile } from '../src/headWhile';

describe('pipe', () => {
  test('should pipe a generator through a series of constructors', () => {
    const result = pipe<number>(skip(10), filter((x: number) => x % 5 === 0), map((x: number) => x * 2), headWhile((x: number) => x < 80))(range(0, 100))
    expect([...result]).toEqual([20, 30, 40, 50, 60, 70]);
  });
});

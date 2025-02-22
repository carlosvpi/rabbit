import {describe, expect, test} from '@jest/globals';
import { pipe } from '../src/pipe';
import { range } from '../src/range';
import { filter } from '../src/filter';
import { drop } from '../src/drop';
import { map } from '../src/map';
import { takeWhile } from '../src/takeWhile';
import { toArray } from '../src/toArray';
import { toAsync } from '../src/toAsync';
import { AsyncOp } from '../src/types';

describe('pipe', () => {
  describe('synchronous mode', () => {
    test('should pipe a generator through a series of constructors', () => {
      const result = pipe<number>(drop(10), filter((x: number) => x % 5 === 0), map((x: number) => x * 2), takeWhile((x: number) => x < 80))(range(0, 100))
      expect([...result]).toEqual([20, 30, 40, 50, 60, 70]);
    });
  });
  describe('asynchronous mode', () => {
    test('should pipe a generator through a series of constructors', async () => {
      const result = pipe<number>(
        drop(10) as AsyncOp,
        filter((x: number) => x % 5 === 0),
        map((x: number) => x * 2),
        takeWhile((x: number) => x < 80)
      )(toAsync(range(0, 100)))
      expect(await toArray(result)).toEqual([20, 30, 40, 50, 60, 70]);
    });
  });
});

import {describe, expect, test} from '@jest/globals';
import { asyncPipe } from '../src/asyncPipe';
import { range } from '../src/range';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncFilter } from '../src/asyncFilter';
import { asyncDrop } from '../src/asyncDrop';
import { asyncMap } from '../src/asyncMap';
import { asyncTakeWhile } from '../src/asyncTakeWhile';

describe('asyncPipe', () => {
  test('should asyncPipe a generator through a series of constructors', async () => {
    const result = asyncPipe<number>(asyncDrop(10), asyncFilter((x: number) => x % 5 === 0), asyncMap((x: number) => x * 2), asyncTakeWhile((x: number) => x < 80))(toAsync(range(0, 100)))
    expect(await asyncToArray(result)).toEqual([20, 30, 40, 50, 60, 70]);
  });
});

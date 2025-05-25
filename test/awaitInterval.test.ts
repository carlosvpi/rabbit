import {describe, expect, test} from '@jest/globals';
import { awaitInterval } from '../src/awaitInterval';
import { toArray } from '../src/toArray';
import { last } from '../src/last';
import { drop } from '../src/drop';
import { map } from '../src/map';
import { returns } from '../src/returns';

describe('awaitInterval', () => {
  test('should awaitInterval 5 elements to our generator', async () => {
    const result = drop<number>(1)(
      (map(([a, b]: number[]) => b - a) as (_: AsyncGenerator<number>) => AsyncGenerator<number>)
      (
        last<number>(2)(
          awaitInterval(20, (stop, each) => {
            each((_,i) => {
              i === 10 && stop()
            })
          })
        )
      )
    )
    const diffs: number[] = await toArray(result)
    expect(diffs.every((diff: number) => diff < 25)).toBe(true)
  });
  test('should awaitInterval 5 elements to our generator and return what is passed to "stop"', async () => {
    const result = await returns(awaitInterval(10, (stop, each) => {each((_, i) => i === 10 && stop(100))}))
    expect(result).toBe(100)
  });
});
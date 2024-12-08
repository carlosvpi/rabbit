import {describe, expect, test} from '@jest/globals';
import { tap } from '../src/tap';
import { range } from '../src/range';

describe('tap', () => {
  test('should double elements', () => {
    let acc = 0
    const result = tap((x: number) => acc += x)(range(0, 10))
    expect([...result]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(acc).toEqual(45);
  });
});
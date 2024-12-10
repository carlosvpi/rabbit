import {describe, expect, test} from '@jest/globals';
import { head } from '../src/head';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { returning } from '../src/returning';
import { toAsync } from '../src/toAsync';

async function* delay(ms: number): AsyncGenerator<number, never, void> {
  let i = 0
  while (true) {
    yield await new Promise(r => setTimeout(() => r(i++),ms))
  }
}

describe('toAsync', () => {
  test('should take the 10 first items of an asynchronous generator', async () => {
    const asyncG = toAsync<number>(yieldReturnValue)(toAsync<number>(returning(100))(toAsync<number>(head(10))(delay(100))))
    const result: number[] = []
    for await (let item of asyncG) {
      result.push(item)
    }
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
  });
});
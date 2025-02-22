import {describe, expect, test} from '@jest/globals';
import { toAsync } from '../src/toAsync';
import { range } from '../src/range';
import { Caller, awaitCall } from '../src/awaitCall';
import { returns } from '../src/returns';
import { feedMap } from '../src/feedMap';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { fromArray } from '../src/fromArray';
import { aggregateRace } from '../src/aggregateRace';
import { feed } from '../src/feed';
import { toArray } from '../src/toArray';

describe('aggregateRace', () => {
  test('should combine two generators', async () => {
    const gen = aggregateRace<number | string>(toAsync(fromArray(['a', 'b', 'c'])), toAsync(range(0, 4)));
    const result: (number | string)[][] = [];
    for await (const value of gen) {
      result.push(value);
    }
    expect(result).toEqual([["a"],["a",0],["b",0],["b",1],["c",1],["c",2]]);
  });

  test('should combine three generators', async () => {
    const gen = aggregateRace<number | string>(toAsync(fromArray(['a', 'b', 'c'])), toAsync(range(0, 4)), toAsync(fromArray([1, 1, 2, 5, 7])));
    const result: (number | string)[][] = [];
    for await (const value of gen) {
      result.push(value);
    }
    expect(result).toEqual([["a"],["a",0],["a",0,1],["b",0,1],["b",1,1],["b",1,1],["c",1,1],["c",2,1],["c",2,2]]);
  });

  test('should combine three generators asynchronously', async () => {
    const [gen1, push1, stop1]: Caller<string, string> = await new Promise(awaitCall)
    const [gen2, push2, stop2]: Caller<string, string> = await new Promise(awaitCall)
    const gen = yieldReturnValue(aggregateRace<number | string>(gen1, gen2))
    setTimeout(() => {
      push1('a')
      push1('b')
    }, 100)
    setTimeout(() => {
      push2('1')
      push1('c')
    }, 200)
    setTimeout(() => push2('2'), 300)
    setTimeout(() => push2('3'), 400)
    setTimeout(() => push2('4'), 500)
    setTimeout(() => stop2('10'), 600)
    setTimeout(() => push1('d'), 700)
    setTimeout(() => stop1('x'), 800)
    const result: (number | string)[][] = [];
    for await (const value of gen) {
      result.push(value);
    }
    expect(result).toEqual([["a"],["b"],["b","1"],["c","1"],["c","2"],["c","3"],["c","4"],"10"]);
  });

  test('should return the return value of each generator at the end', async () => {
    const result = await returns(aggregateRace(toAsync(range(0, 5, 1, 100)), toAsync(fromArray([0, 1, -2], 200)), toAsync(range(0, 8, 1, 300))));
    expect(result).toEqual(200);
  });

  test('should pass down the value of `next`', async () => {
    const gen = feed<number[]>(toAsync(fromArray([12, 32, 7])))(aggregateRace(toAsync(feedMap((x: number) => x * 2, 100)), toAsync(feedMap((x: number) => x + 1, 200))));
    const result = await toArray(gen)
    expect(result).toEqual([[200], [200, 201], [24, 201], [24, 13]]);
  });
});
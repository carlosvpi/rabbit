import {describe, expect, test} from '@jest/globals';
import { tryCatch } from '../src/tryCatch';
import { range } from '../src/range';
import { feed } from '../src/feed';
import { yieldReturnValue } from '../src/yieldReturnValue';
import { toArray } from '../src/toArray';
import { toAsync } from '../src/toAsync';
import { deferPromise } from './util';

describe('tryCatch', () => {
  describe('synchronous mode', () => {
    function* yieldsErrors (errors: boolean) {
      const x = yield 1
      yield x ?? 2
      if (errors) throw new Error('My error 1')
      yield 3
      if (errors) throw new Error('My error 2')
      yield 4
      return 5
    }
    test('should catch the error and return it', () => {
      const result = yieldReturnValue(tryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(true)))
      expect([...result]).toEqual([1, 2, [null, 'Found error: My error 1']]);
    });
    test('should generate the same items and return the same thing if no errors', () => {
      const result = yieldReturnValue(tryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(false)))
      expect([...result]).toEqual([1, 2, 3, 4, [5, null]]);
    });
    test('should pass next values to the original generator', () => {
      const result = feed(range(1, 6))(yieldReturnValue(tryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(false))))
      expect([...result]).toEqual([1, 1, 3, 4, [5, null]]);
    });
    test('should call doFinally when no errors', async () => {
      const [promise, resolve] = deferPromise()
      const result = yieldReturnValue(tryCatch<number | string>((err: Error) => err.message, () => {resolve('finally')})(yieldsErrors(false)))
      expect([...result]).toEqual([1, 2, 3, 4, [5, null]]);
      expect(await promise).toEqual('finally');
    });
    test('should call doFinally when errors', async () => {
      const [promise, resolve] = deferPromise()
      const result = yieldReturnValue(tryCatch<number | string>((err: Error) => err.message, () => {resolve('finally')})(yieldsErrors(true)))
      expect([...result]).toEqual([1, 2, [null, 'My error 1']]);
      expect(await promise).toEqual('finally');
    });
  });
  describe('asynchronous mode', () => {
    async function* yieldsErrors (errors: boolean) {
      const x = yield await Promise.resolve(1)
      yield  await Promise.resolve(x ?? 2)
      if (errors) throw new Error('My error 1')
      yield await Promise.resolve(3)
      if (errors) throw new Error('My error 2')
      yield  await Promise.resolve(4)
      return 5
    }
    test('should catch the error and return it', async () => {
      const result = yieldReturnValue(tryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(true)))
      expect(await toArray(result)).toEqual([1, 2, [null, 'Found error: My error 1']]);
    });
    test('should generate the same items and return the same thing if no errors', async () => {
      const result = yieldReturnValue(tryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(false)))
      expect(await toArray(result)).toEqual([1, 2, 3, 4, [5, null]]);
    });
    test('should pass next values to the original generator', async () => {
      const result = feed(toAsync(range(1, 6)))(yieldReturnValue(tryCatch<number | string>((err: Error) => `Found error: ${err.message}`)(yieldsErrors(false))))
      expect(await toArray(result)).toEqual([1, 1, 3, 4, [5, null]]);
    });
    test('should call doFinally when no errors', async () => {
      const [promise, resolve] = deferPromise()
      const result = yieldReturnValue(tryCatch<number | string>((err: Error) => err.message, () => {resolve('finally')})(yieldsErrors(false)))
      expect(await toArray(result)).toEqual([1, 2, 3, 4, [5, null]]);
      expect(await promise).toEqual('finally');
    });
    test('should call doFinally when errors', async () => {
      const [promise, resolve] = deferPromise()
      const result = yieldReturnValue(tryCatch<number | string>((err: Error) => err.message, () => {resolve('finally')})(yieldsErrors(true)))
      expect(await toArray(result)).toEqual([1, 2, [null, 'My error 1']]);
      expect(await promise).toEqual('finally');
    });
  });
});

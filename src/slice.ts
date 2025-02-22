/**
 * `slice(start, end, step)(g)` gets items indexed `i` on `g`, where 0 <= `start` <= `i` < `end`, and if `i` is an index, the next index is `i + step`.
 * 
 * **Example** `slice(5, 10)(range())` generates 5, 6, 7, 8, 9
 * 
 * **Example** `slice(5, 10, 2)(range())` generates 5, 7, 9
 * 
 * `slice(start, end, step, returnValue)(g)` ~~ `pipe(drop(start), take(end - start, returnValue), step(step))(g)`
 * @param {number} [start=0] The index on `g` of the first item of `g` to generate
 * @param {number} [end=Infinity] The index on `g` of the first item of `g` to not generate
 * @param {number} [step=1] The distance in two consecutive indexes on `g` to generate
 */

import { take } from './take'
import { drop } from './drop'
import { step as stepF } from './step'
import { pipe } from './pipe'

export function slice<T, TReturn = any, TNext = any> (start: number = 0, end: number = Infinity, step: number = 1, returnValue?: TReturn) {
  function functor (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext>
  function functor (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext>
  function functor (g: Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>): Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext> {
    if (g[Symbol.asyncIterator]) {
      return pipe<T, TReturn, TNext>(drop(start) as (_: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>, take(end - start), stepF(step, returnValue))(g as AsyncGenerator<T, TReturn, TNext>) as AsyncGenerator<T, TReturn, TNext>
    }
    return pipe<T, TReturn, TNext>(drop(start), take(end - start), stepF(step, returnValue))(g as Generator<T, TReturn, TNext>) as Generator<T, TReturn, TNext>
  }
  return functor
}

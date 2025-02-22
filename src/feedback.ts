function asyncFeedback<T, TReturn = any, TFeederReturn = any, TNext = any> (feeder: AsyncGenerator<TNext, TFeederReturn, T>) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, any> {
    let gCursor: IteratorResult<T, TReturn>
    let feedCursor: IteratorResult<TNext, TFeederReturn>
    do {
      gCursor = await g.next(feedCursor?.value as TNext)
      if (!gCursor.done) yield gCursor.value as T
      feedCursor = await feeder.next(gCursor.value as T)
    } while (!gCursor.done && !feedCursor.done)
    return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null]
  }
}

function syncFeedback<T, TReturn = any, TFeederReturn = any, TNext = any> (feeder: Generator<TNext, TFeederReturn, T>) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, FeedReturn<TReturn, TFeederReturn>, any> {
    let gCursor: IteratorResult<T, TReturn>
    let feedCursor: IteratorResult<TNext, TFeederReturn>
    do {
      gCursor = g.next(feedCursor?.value as TNext)
      if (!gCursor.done) yield gCursor.value as T
      feedCursor = feeder.next(gCursor.value as T)
    } while (!gCursor.done && !feedCursor.done)
    return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null]
  }
}

import { FeedReturn } from "./feed"

/**
 * `feedback(feeder)(g)` => `e1 = g.next()`, `e2 = g.next(feeder.next(e1))`, `e3 = g.next(feeder.next(e2))`, ...
 * 
 * If the generator `g` returns `value`, `feed(feeder)(g)` returns `[value, null]`
 * 
 * If the `feeder` returns `value`, `feed(feeder)(g)` returns `[null, value]`
 * 
 * If both the generator `g` and `feeder` return `value1` and `value2` at the same time, `feed(feeder)(g)` returns `[value1, value2]`
 * 
 * @param {generator} [feeder] the feeding generator
 */

export function feedback<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any> (feeder: AsyncGenerator<TNext, any, TFeederNext>): (g: AsyncGenerator<T, any, TNext>) => AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>
export function feedback<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any> (feeder: Generator<TNext, any, TFeederNext>): (g: Generator<T, any, TNext>) => Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>

export function feedback<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any> (feeder: AsyncGenerator<TNext, any, TFeederNext> | Generator<TNext, any, TFeederNext>) {
  const f = feeder[Symbol.asyncIterator]
    ? asyncFeedback(feeder as AsyncGenerator<T, TReturn, TNext>)
    : syncFeedback(feeder as Generator<T, TReturn, TNext>)
  return feeder[Symbol.asyncIterator]
    ? (function (g: AsyncGenerator<T, any, TNext>): AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext> {
        return (f as (_: AsyncGenerator<T, any, TNext>) => AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>)(g as AsyncGenerator<T, any, TNext>) as AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>;
      })
    : (function (g: Generator<T, any, TNext>): Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext> {
        return (f as (_: Generator<T, any, TNext>) => Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>)(g as Generator<T, any, TNext>) as Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>;
      })
}

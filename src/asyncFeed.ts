/**
 * `asyncFeed(feeder)(g)` => `g.next()`, `g.next(feeder.next())`, `g.next(feeder.next())`, ...
 * 
 * If the generator `g` returns `value`, `asyncFeed(feeder)(g)` returns `[value, null]`
 * 
 * If the `feeder` returns `value`, `asyncFeed(feeder)(g)` returns `[null, value]`
 * 
 * If both the generator `g` and `feeder` return `value1` and `value2` at the same time, `asyncFeed(feeder)(g)` returns `[value1, value2]`
 * 
 * @param {generator} [feeder] the feeding generator
 */

import { FeedReturn } from "./feed"

export function asyncFeed<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any> (feeder: AsyncGenerator<TNext, any, TFeederNext>): (g: AsyncGenerator<T, any, TNext>) => AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext> {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext> {
    let gCursor: IteratorResult<T, TReturn>
    let feedCursor: IteratorResult<TNext, TFeederReturn>
    let next: TFeederNext
    do {
      gCursor = await g.next(feedCursor?.value as TNext)
      if (!gCursor.done) next = yield gCursor.value as T
      feedCursor = await feeder.next(next)
    } while (!gCursor.done && !feedCursor?.done)
    return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null]
  }
}

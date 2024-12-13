import { FeedReturn } from "./feed"

/**
 * `asyncFeedback(feeder)(g)` => `e1 = g.next()`, `e2 = g.next(feeder.next(e1))`, `e3 = g.next(feeder.next(e2))`, ...
 * 
 * If the generator `g` returns `value`, `feed(feeder)(g)` returns `[value, null]`
 * 
 * If the `feeder` returns `value`, `feed(feeder)(g)` returns `[null, value]`
 * 
 * If both the generator `g` and `feeder` return `value1` and `value2` at the same time, `feed(feeder)(g)` returns `[value1, value2]`
 * 
 * @param {generator} [feeder] the feeding generator
 */

export function asyncFeedback<T, TReturn = any, TFeederReturn = any, TNext = any> (feeder: AsyncGenerator<TNext, TFeederReturn, T>) {
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

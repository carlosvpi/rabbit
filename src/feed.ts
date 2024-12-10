/**
 * `feed(feeder)(g)` => `g.next()`, `g.next(feeder.next())`, `g.next(feeder.next())`, ...
 * 
 * If the generator `g` returns `value`, `feed(feeder)(g)` returns `[value, null]`
 * 
 * If the `feeder` returns `value`, `feed(feeder)(g)` returns `[null, value]`
 * 
 * If both the generator `g` and `feeder` return `value1` and `value2` at the same time, `feed(feeder)(g)` returns `[value1, value2]`
 * 
 * @param {generator} [feeder] the feeding generator
 */

export type FeedReturn<TReturn, TFeederReturn> = (TReturn | TFeederReturn | null)[]

export function feed<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any> (feeder: Generator<TNext, any, TFeederNext>): (g: Generator<T, any, TNext>) => Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext> {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext> {
    let gCursor: IteratorResult<T, TReturn>
    let feedCursor: IteratorResult<TNext, TFeederReturn>
    let next: TFeederNext
    do {
      gCursor = g.next(feedCursor?.value as TNext)
      if (!gCursor.done) next = yield gCursor.value as T
      feedCursor = feeder.next(next)
    } while (!gCursor.done && !feedCursor?.done)
    return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null]
  }
}

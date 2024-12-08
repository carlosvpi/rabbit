/**
 * `feedback(feeder)(g)` => `g.next()`, `g.next(feeder.next())`, `g.next(feeder.next())`, ...
 * 
 * The generation ends when either feeder or g are done.
 * 
 * @param {generator} [feeder] the feeding generator
 */

export function feed<T, I> (feeder?: Generator<I>) {
  return function* (g: Generator<T, any, I>) {
    let gCursor: IteratorResult<T, any>
    let feedCursor: IteratorResult<I, any> | undefined = undefined
    do {
      gCursor = g.next(feedCursor?.value)
      if (!gCursor.done) yield gCursor.value
      if (feeder && !feedCursor?.done) feedCursor = feeder.next()
    } while (!gCursor.done && !feedCursor.done)
  }
}

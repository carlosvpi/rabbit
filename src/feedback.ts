/**
 * `feedback(feeder)(g)` => `e1 = g.next()`, `e2 = g.next(feeder.next(e1))`, `e3 = g.next(feeder.next(e2))`, ...
 * 
 * @param {generator} [feeder] the feeding generator
 */

export function feedback<T, I> (feeder?: Generator<I>) {
  return function* (g: Generator<T, any, I>) {
    let gCursor: IteratorResult<T, any>
    let feedCursor: IteratorResult<I, any> | undefined = undefined
    do {
      gCursor = g.next(feedCursor?.value)
      if (!gCursor.done) yield gCursor.value
      if (feeder && !feedCursor?.done) feedCursor = feeder.next(gCursor.value)
    } while (!gCursor.done)
  }
}

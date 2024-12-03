export function* feed<T, I> (g: Generator<T, any, I>, feed?: Generator<I>) {
  let gCursor: IteratorResult<T, any>
  let feedCursor: IteratorResult<I, any> | undefined = undefined
  do {
    gCursor = g.next(feedCursor?.value)
    if (!gCursor.done) yield gCursor.value
    if (feed && !feedCursor?.done) feedCursor = feed.next()
  } while (!gCursor.done)
}

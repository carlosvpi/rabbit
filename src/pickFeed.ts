export function pickFeed<T, I> (pick: Generator<I>) {
  return function* (g: Generator<T, any, I>) {
    let gCursor: IteratorResult<T, any>
    let pickCursor: IteratorResult<I, any> | undefined = undefined
    do {
      pickCursor = pick.next(gCursor)
      if (pickCursor.done) return
      while (pickCursor.value-- && (!gCursor || !gCursor.done)) {
        gCursor = g.next()
      }
      if (gCursor.done) return
      yield gCursor.value
    } while (!gCursor.done)
  }
}

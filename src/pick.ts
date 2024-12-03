export function pick<T> (indexes: number[]) {
  return function* (g: Generator<T>) {
    let gCursor: IteratorResult<T, any>
    let i: number = 0
    let pick: number = indexes[0]
    do {
      while (i < indexes.length && indexes[i] < 0) i++
      if (i >= indexes.length) return
      pick = indexes[i]
      while (pick-- && (!gCursor || !gCursor.done)) {
        gCursor = g.next()
      }
      if (gCursor.done) return
      yield gCursor.value
      i++
    } while (!gCursor.done)
  }
}

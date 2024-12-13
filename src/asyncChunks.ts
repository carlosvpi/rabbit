/**
 * `asyncChunks(size)(g)` gets the elements of an asynchronous generator `g` grouped into chunks of `size` elements
 * 
 * For each item of a chunk, `g` is invoked with the same `next` value.
 * 
 * @param {number} [size=1] The size of the chunks to generate
 */

export function asyncChunks<T, TReturn = any, TNext = any> (size: number = 1) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T[], TReturn, TNext> {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let tuple: T[] = []
    while (!(iterator = await g.next(next)).done) {
      tuple.push(iterator.value as T)
      if (tuple.length < size) continue
      next = yield tuple
      tuple = []
    }
    if (tuple.length > 0 && tuple.length < size) {
      yield tuple
    }
    return iterator.value
  }
}

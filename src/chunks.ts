/**
 * `chunks(size)(g)` gets the elements of `g` grouped into chunks of `size` elements
 * 
 * For each item of a chunk, `g` is invoked with the same `next` value.
 * 
 * **Example** `chunks(3)(range())` generates [0, 1, 2], [3, 4, 5], [6, 7, 8], ...
 * 
 * @param {number} [size=1] The size of the chunks to generate
 */

export function chunks<T, TReturn = any, TNext = any> (size: number = 1) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T[], TReturn, TNext> {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let tuple: T[] = []
    while (!(iterator = g.next(next)).done) {
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

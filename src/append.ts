/**
 * `append(g1)(g2)` generates, first, all items from `g2`, and then all items from `g1`.
 * 
 * `next` values passed to `append(g1)(g2)` are passed down to `g2`, first, and `g1`, after.
 * 
 * The return value of `g2` is ignored. The return value of `append(g1)(g2)` is that of `g1`.
 * 
 * @param {generator} [g1] the generator to append
 */

export function append<T, TReturn = any, TNext = any> (object: Generator<T, TReturn, TNext>) {
  return function* (g: Generator<T, TReturn, TNext>) {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = g.next(next)).done) {
      next = yield iterator.value
    }
    while (!(iterator = object.next(next)).done) {
      next = yield iterator.value
    }
    return iterator.value
  }
}

/**
 * `asyncPrepend(g1)(g2)` generates, first, all items from `g1`, and then all items from `g2`
 * 
 * `next` values passed to `asyncPrepend(g1)(g2)` are passed down to `g1`, first, and `g2`, after.
 * 
 * The return value of `g1` is ignored. The return value of `asyncPrepend(g1)(g2)` is that of `g2`.
 * 
 * @param {generator} [object] the generator to prepend asynchronously
 */

export function asyncPrepend<T, TReturn = any, TNext = any> (object: AsyncGenerator<T, TReturn, TNext>) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>) {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = await object.next(next)).done) {
      next = yield iterator.value
    }
    while (!(iterator = await g.next(next)).done) {
      next = yield iterator.value
    }
    return iterator.value
  }
}

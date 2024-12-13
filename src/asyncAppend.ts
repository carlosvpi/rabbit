/**
 * `asyncAppend(g1)(g2)` generates, first, all items from `g2`, and then all items from `g1`.
 * 
 * `next` values passed to `asyncAppend(g1)(g2)` are passed down to `g2`, first, and `g1`, after.
 * 
 * The return value of `g2` is ignored. The return value of `asyncAppend(g1)(g2)` is that of `g1`.
 * 
 * @see append
 * @param {generator} [g1] the generator to asyncAppend
 */

export function asyncAppend<T, TReturn = any, TNext = any> (object: AsyncGenerator<T, TReturn, TNext>) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = await g.next(next)).done) {
      next = yield iterator.value as Awaited<T>
    }
    while (!(iterator = await object.next(next)).done) {
      next = yield iterator.value as Awaited<T>
    }
    return iterator.value
  }
}

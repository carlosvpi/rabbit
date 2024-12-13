/**
 * `asyncMap(f)(g)` generates items `f(e, i, n)` where `e` are items of an asynchronous `g`, `i` is the index of `e` in `g` and `n` is the `next` passed to get `e`.
 * 
 * `asyncMap(f)(g)` returns the same value as `g`.
 * 
 * @param {function} [f] The function to apply to elements of `g`
 */

export function asyncMap<T, U, TReturn = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => U) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<U, TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = await g.next(next)).done) {
      next = yield f(iterator.value as T, i++, next)
    }
    return iterator.value
  }
}

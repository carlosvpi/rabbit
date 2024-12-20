/**
 * `asyncTap(f)(g)` applies `f(e)` where `e` are items of `g`, and generates `e` unchanged. It returns the same as `g`.
 * 
 * @param {function} [f] The function to apply to elements of `g`
 */

export function asyncTap<T, TResult = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => any) {
  return async function* (g: AsyncGenerator<T, TResult, TNext>): AsyncGenerator<T, TResult, TNext> {
    let i: number = 0
    let iterator: IteratorResult<T, TResult>
    let next: TNext
    while (!(iterator = await g.next(next)).done) {
      f(iterator.value as T, i++, next)
      next = yield iterator.value as T
    }
    return iterator.value as TResult
  }
}

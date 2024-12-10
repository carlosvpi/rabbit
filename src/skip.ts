/**
 * `skip(n)(g)` skips `n` items `e` of `g`. After skipping the items, it generates the same as `g` and returns the same as `g`.
 * 
 * If `g` is shorter than `n`, `skip` returns `g`'s return value when it ends.
 * 
 * **Example** `skip(5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {number} [n] The amount of items to skip
 */

export function skip<T, TReturn = any, TNext = any> (n: number = 0, returnValue?: TReturn) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    while (n-- > 0 && !iterator?.done) {
      iterator = g.next(next)
    }
    if (iterator?.done) return returnValue ?? iterator?.value
    while (!(iterator = g.next(next)).done) {
      next = yield iterator.value as T
    }
    return returnValue ?? iterator.value
  }
}

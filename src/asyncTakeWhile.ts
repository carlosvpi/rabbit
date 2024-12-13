/**
 * `asyncTakeWhile(p)(g)` generates items `e` of `g` as long `p(e, index, next)` holds (`index` is the index of `e` in `g` and `next` is the next value used to generate it)
 * 
 * If `g` finishes before finsing the item that fulfils `p`, `asyncTakeWhile(p, v)(g)` returns `v`
 * 
 * **Example** `asyncTakeWhile(x => x % 6 !== 5)(range())` generates 0, 1, 2, 3, 4
 * @param {Function} [p] The predicate that is checked against items of `g`, their indexes and the previous next value.
 * @param {TReturn} [returnValue] The value to return if g runs out
 */

export function asyncTakeWhile<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean, returnValue?: TReturn) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let i = 0
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    while(!(iterator = await g.next(next)).done) {
      if (!p(iterator.value as T, i++, next)) return returnValue
      next = yield iterator.value as T
    }
    if (iterator.done) return iterator.value
    return returnValue
  }
}

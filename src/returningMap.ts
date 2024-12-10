/**
 * 
 * `returningMap(f)(g)` generates the same as `g`, and when `g` returns `value`, `returningMap(f)(g)` returns `f(value, i, next)` (with `i` the length of `g` and `next` the value used to generate it)
 * 
 * @param returnMap the function to apply. It takes the return value of `g`, the length of `g` and the last `next` value.
 * @returns 
 */

export function returningMap<T, TReturn=any, UReturn = TReturn, TNext=any> (returnMap: (_: TReturn, _1: number, _2: TNext) => UReturn) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, UReturn, TNext> {
    let next: TNext
    let i = 0
    let iterator: IteratorResult<T>
    while (!(iterator = g.next(next)).done) {
      i++
      next = yield iterator.value
    }
    return returnMap(iterator.value, i, next)
  }
}

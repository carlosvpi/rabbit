/**
 * 
 * `some(p)(g)` generates false until an element of `g` satisfies a predicate, in which case it generates true.
 * 
 * It returns the value that fulfilled `p`, if some did, or `null`.
 * 
 * `some` does not apply `p` to the return value of `g`.
 * 
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns 
 */

export function some<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<boolean, T | null, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let value: boolean = false
    while(!(iterator = g.next(next)).done) {
      value ||= p(iterator.value as T, i++, next)
      next = yield value
      if (value) return iterator.value as T
    }
    return null
  }
}

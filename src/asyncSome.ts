/**
 * 
 * `asyncSome(p)(g)` generates false until an element of `g` satisfies a predicate, in which case it generates true.
 * 
 * It returns the value that fulfilled `p`, if ssome did, or the value that returns `g`.
 * 
 * `asyncSome` does not apply `p` to the return value of `g`.
 * 
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns 
 */

export function asyncSome<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<boolean, T | TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let value: boolean = false
    while(!(iterator = await g.next(next)).done) {
      value ||= p(iterator.value as T, i++, next)
      next = yield value
      if (value) return iterator.value as T
    }
    return iterator.value as TReturn
  }
}

/**
 * 
 * `asyncEvery(p)(g)` asynchronously generates true until an element of `g` no longer satisfies a predicate, in which case it generates false.
 * 
 * It returns the value that did not fulfil `p`, if some, or the value that returns `g`.
 * 
 * `asyncEvery` does not apply `p` to the return value of `g`.
 * 
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns 
 */

export function asyncEvery<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<boolean, T | TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let value: boolean = true
    while(!(iterator = await g.next(next)).done) {
      value &&= p(iterator.value as T, i++, next)
      next = yield value
      if (!value) return iterator.value as T
    }
    return iterator.value
  }
}

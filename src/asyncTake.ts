/**
 * `asyncTake(n)(g)` generates the first `n` (**default** 1) items of asynchronous `g`
 * 
 * If `g` runs out before reaching `n` elements, `asyncTake(n, value)(g)` returns the return value of `g`. Otherwise, it returns `value`.
 * 
 * @param {number} [n = 1] The amount of items to generate
 * @param {TReturn} [returnValue] The value to return if `g` runs out
 */

export function asyncTake<T, TReturn = any, TNext = any> (n: number = 1, returnValue?: TReturn) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let i: IteratorResult<T, TReturn>
    while (n-- && !(i = await g.next(next)).done) {
      next = yield i.value as T
    }
    if (i.done) {
      return i.value
    }
    return returnValue
  }
}

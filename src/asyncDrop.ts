/**
 * `asyncDrop(n)(g)` drops `n` items `e` of `g`. After dropping the items, it generates the same as `g` and returns the same as `g`.
 * 
 * If `g` is shorter than `n`, `asyncDrop` returns `g`'s return value when it ends.
 * 
 * **Example** `asyncDrop(5)(toAsync(range(0, 10)))` generates 5, 6, 7, 8, 9
 * @param {number} [n] The amount of items to asyncDrop
 */

export function asyncDrop<T, TReturn = any, TNext = any> (n: number = 0, returnValue?: TReturn) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    while (n-- > 0 && !iterator?.done) {
      iterator = await g.next(next)
    }
    if (iterator?.done) return returnValue ?? iterator?.value
    while (!(iterator = await g.next(next)).done) {
      next = yield iterator.value as T
    }
    return returnValue ?? iterator.value
  }
}

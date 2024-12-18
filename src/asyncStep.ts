/**
 * `asyncStep(distance)(g)` gets the elements of `g` separated `distance` items between each.
 * 
 * `asyncStep(distance, returnValue)(g)` returns `returnValue` if specified. Otherwise, it returns the returned value of `g`.
 * 
 * **Example** `asyncStep(5)(range())` generates 0, 5, 10, 15...
 * 
 * @param {number} [distance=0] The index difference of items of `g` to be generated by `asyncStep(distance)(g)`
 */

export function asyncStep<T, TReturn = any, TNext = any> (distance: number = 1, returnValue?: TReturn) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let current = 1
    while (!(iterator = await g.next(next)).done) {
      if (--current) continue
      current = distance
      next = yield iterator.value as T
    }
    return returnValue ?? iterator.value
  }
}

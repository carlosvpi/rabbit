/**
 * 
 * `asyncReturning(value)(g)` generates the same as `g`, and when `g` ends, returns `value`
 * 
 * @param returnValue The value to return
 * @returns 
 */

export function asyncReturning<T, TReturn=any, TNext=any> (returnValue: TReturn) {
  return async function* (g: AsyncGenerator<T, any, TNext>) {
    let next: TNext
    let i: IteratorResult<T>
    while (!(i = await g.next(next)).done) {
      next = yield i.value
    }
    return returnValue
  }
}

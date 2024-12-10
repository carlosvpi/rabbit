/**
 * 
 * `returning(value)(g)` generates the same as `g`, and when `g` ends, returns `value`
 * 
 * @param returnValue The value to return
 * @returns 
 */

export function returning<T, TReturn=any, TNext=any> (returnValue: TReturn) {
  return function* (g: Generator<T, any, TNext>) {
    let next: TNext
    let i: IteratorResult<T>
    while (!(i = g.next(next)).done) {
      next = yield i.value
    }
    return returnValue
  }
}

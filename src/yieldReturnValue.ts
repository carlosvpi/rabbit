/**
 * `yieldReturnValue(g)` generates the same values as g, but at also yields the return value of `g`.
 * 
 * @param g `
 */

export function* yieldReturnValue<T, TReturn=any, TNext=any> (g: Generator<T, TReturn, TNext>) {
  let next: TNext
  let i: IteratorResult<T, TReturn>
  while (!(i = g.next(next)).done) {
    next = yield i.value
  }
  yield i.value
}

/**
 * `asyncYieldReturnValue(g)` generates the same values as g, but at also yields the return value of `g`.
 * 
 * @param g `
 */

export async function* asyncYieldReturnValue<T, TReturn=any, TNext=any> (g: AsyncGenerator<T, TReturn, TNext>) {
  let next: TNext
  let i: IteratorResult<T, TReturn>
  while (!(i = await g.next(next)).done) {
    next = yield i.value
  }
  yield i.value
}

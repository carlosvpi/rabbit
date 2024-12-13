/**
 * 
 * `asyncReturns(g)` returns the returning value of the async generator g
 * 
 * @param g
 * @returns 
 */

export async function asyncReturns<T = any, TReturn = T> (g: AsyncGenerator<any, TReturn>): Promise<TReturn> {
  let i: IteratorResult<T>
  while (!(i = await g.next()).done) {}
  return i.value as TReturn
}

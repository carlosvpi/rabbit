/**
 * 
 * `returns(g)` returns the returning value of the generator g
 * 
 * @param g
 * @returns 
 */

export function returns<T = any, TReturn = T> (g: Generator<any, TReturn>): TReturn {
  let i: IteratorResult<T>
  while (!(i = g.next()).done) {}
  return i.value as TReturn
}

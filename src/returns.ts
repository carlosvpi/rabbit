async function asyncReturns<T = any, TReturn = T> (g: AsyncGenerator<any, TReturn>): Promise<TReturn> {
  let i: IteratorResult<T>
  while (!(i = await g.next()).done) {}
  return i.value as TReturn
}

function syncReturns<T = any, TReturn = T> (g: Generator<any, TReturn>): TReturn {
  let i: IteratorResult<T>
  while (!(i = g.next()).done) {}
  return i.value as TReturn
}

/**
 * 
 * `returns(g)` returns the returning value of the generator g
 * 
 * @param g
 * @returns 
 */

export function returns<T = any, TReturn = T, TNext = any> (g: Generator<any, TReturn, TNext>): TReturn
export function returns<T = any, TReturn = T, TNext = any> (g: AsyncGenerator<any, TReturn, TNext>): Promise<TReturn>

export function returns<T = any, TReturn = T, TNext = any> (g: Generator<any, TReturn, TNext> | AsyncGenerator<any, TReturn, TNext>): TReturn | Promise<TReturn> {
  if (g[Symbol.asyncIterator]) {
    return asyncReturns(g as AsyncGenerator<T, TReturn, TNext>) as Promise<TReturn>;
  }
  return syncReturns(g as Generator<T, TReturn, TNext>) as TReturn;
}

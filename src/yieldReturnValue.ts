async function* asyncYieldReturnValue<T, TReturn=any, TNext=any> (g: AsyncGenerator<T, TReturn, TNext>) {
  let next: TNext
  let i: IteratorResult<T, TReturn>
  while (!(i = await g.next(next)).done) {
    next = yield i.value
  }
  yield i.value
}

function* syncYieldReturnValue<T, TReturn=any, TNext=any> (g: Generator<T, TReturn, TNext>) {
  let next: TNext
  let i: IteratorResult<T, TReturn>
  while (!(i = g.next(next)).done) {
    next = yield i.value
  }
  yield i.value
}


/**
 * `yieldReturnValue(g)` generates the same values as g, but at also yields the return value of `g`.
 * 
 * @param g `
 */

export function yieldReturnValue<T, TReturn=any, TNext=any> (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext>
export function yieldReturnValue<T, TReturn=any, TNext=any> (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext>

export function yieldReturnValue<T, TReturn=any, TNext=any> (g: AsyncGenerator<T, TReturn, TNext> | Generator<T, TReturn, TNext>) {
  if (g[Symbol.asyncIterator]) {
    return asyncYieldReturnValue(g as AsyncGenerator<T, TReturn, TNext>) as AsyncGenerator<T, TReturn, TNext>;
  }
  return syncYieldReturnValue(g as Generator<T, TReturn, TNext>) as Generator<T, TReturn, TNext>;
}

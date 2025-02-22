function asyncReturning<T, TReturn=any, TNext=any> (returnValue: TReturn) {
  return async function* (g: AsyncGenerator<T, any, TNext>) {
    let next: TNext
    let i: IteratorResult<T>
    while (!(i = await g.next(next)).done) {
      next = yield i.value
    }
    return returnValue
  }
}

function syncReturning<T, TReturn=any, TNext=any> (returnValue: TReturn) {
  return function* (g: Generator<T, any, TNext>) {
    let next: TNext
    let i: IteratorResult<T>
    while (!(i = g.next(next)).done) {
      next = yield i.value
    }
    return returnValue
  }
}

/**
 * 
 * `returning(value)(g)` generates the same as `g`, and when `g` ends, returns `value`
 * 
 * @param returnValue The value to return
 * @returns 
 */

export function returning<T, TReturn=any, TNext=any> (returnValue: TReturn) {
  const asyncFunctor = asyncReturning(returnValue)
  const syncFunctor = syncReturning(returnValue)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as G;
  }
}

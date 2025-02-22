function asyncTap<T, TReturn = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => any) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let i: number = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = await g.next(next)).done) {
      f(iterator.value as T, i++, next)
      next = yield iterator.value as T
    }
    return iterator.value as TReturn
  }
}

function syncTap<T, TReturn = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => any) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
    let i: number = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = g.next(next)).done) {
      f(iterator.value as T, i++, next)
      next = yield iterator.value as T
    }
    return iterator.value as TReturn
  }
}

/**
 * `tap(f)(g)` applies `f(e)` where `e` are items of `g`, and generates `e` unchanged. It returns the same as `g`.
 * 
 * @param {function} [f] The function to apply to elements of `g`
 */

export function tap<T, TReturn = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => any) {
  const asyncFunctor = asyncTap(f)
  const syncFunctor = syncTap(f)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as G;
  }
}

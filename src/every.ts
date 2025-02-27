function asyncEvery<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<boolean, T | TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let value: boolean = true
    while(!(iterator = await g.next(next)).done) {
      value &&= p(iterator.value as T, i++, next)
      next = yield value
      if (!value) return iterator.value as T
    }
    return iterator.value
  }
}

function syncEvery<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<boolean, T | TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let value: boolean = true
    while(!(iterator = g.next(next)).done) {
      value &&= p(iterator.value as T, i++, next)
      next = yield value
      if (!value) return iterator.value as T
    }
    return iterator.value
  }
}

/**
 * 
 * `every(p)(g)` generates true until an element of `g` no longer satisfies a predicate, in which case it generates false.
 * 
 * It returns the value that did not fulfil `p`, if some, or the value that returns `g`.
 * 
 * `every` does not apply `p` to the return value of `g`.
 * 
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns 
 */

export function every<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  const asyncFunctor = asyncEvery(p)
  const syncFunctor = syncEvery(p)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as G;
  }
}

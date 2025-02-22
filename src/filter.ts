function asyncFilter<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while(!(iterator = await g.next(next)).done) {
      if (p(iterator.value as T, i++, next)) {
        next = yield iterator.value as T
      }
    }
    return iterator.value
  }
}

function syncFilter<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while(!(iterator = g.next(next)).done) {
      if (p(iterator.value as T, i++, next)) {
        next = yield iterator.value as T
      }
    }
    return iterator.value
  }
}

/**
 * `filter(p)(g)` generates the items `e` of `g` that pass the predicate `p(e, i)`, where `i` is the index of `e` in `g`.
 * 
 * `p` is passed each item and the index of the item.
 * 
 * `filter(p)(g)` returns the same value as `g` regardless of whether it passes `p`.
 * 
 * **Example** `filter(x => x % 2 === 0)(range(0, 10))` generates 0, 2, 4, 6, 8
 * @param {generator} [p] the filtering predicate
 */

export function filter<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  const asyncFunctor = asyncFilter(p)
  const syncFunctor = syncFilter(p)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as G;
  }
}

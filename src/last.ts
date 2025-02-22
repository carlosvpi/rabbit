function asyncLast<T, TReturn = any, TNext = any> (size: number = 1) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T[], TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let tuple: T[] = []
    while (!(iterator = await g.next(next)).done) {
      tuple.push(iterator.value as T)
      next = yield [...tuple]
      if (tuple.length < size) continue
      tuple = tuple.slice(1)
    }
    return iterator.value
  }
}

function syncLast<T, TReturn = any, TNext = any> (size: number = 1) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T[], TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let tuple: T[] = []
    while (!(iterator = g.next(next)).done) {
      tuple.push(iterator.value as T)
      next = yield [...tuple]
      if (tuple.length < size) continue
      tuple = tuple.slice(1)
    }
    return iterator.value
  }
}

/**
 * `last(size)(g)` generates arrays of `size` elements with the last elements generated of `g` (generating always one more). It returns the same as `g`.
 * 
 * **Example** `last(3)(range())` generates [0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], ...
 * 
 * @param {number} [size=1] The size of the tuples to generate
 */

export function last<T, TReturn = any, TNext = any> (size: number = 1) {
  const asyncFunctor = asyncLast(size)
  const syncFunctor = syncLast(size)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, any, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, any, TNext>) as G;
  }
}

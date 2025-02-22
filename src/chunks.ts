function asyncChunks<T, TReturn = any, TNext = any> (size: number = 1) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T[], TReturn, TNext> {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let tuple: T[] = []
    while (!(iterator = await g.next(next)).done) {
      tuple.push(iterator.value as T)
      if (tuple.length < size) continue
      next = yield tuple
      tuple = []
    }
    if (tuple.length > 0 && tuple.length < size) {
      yield tuple
    }
    return iterator.value
  }
}

function syncChunks<T, TReturn = any, TNext = any> (size: number = 1) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T[], TReturn, TNext> {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    let tuple: T[] = []
    while (!(iterator = g.next(next)).done) {
      tuple.push(iterator.value as T)
      if (tuple.length < size) continue
      next = yield tuple
      tuple = []
    }
    if (tuple.length > 0 && tuple.length < size) {
      yield tuple
    }
    return iterator.value
  }
}

/**
 * Divides a generator in chunks of a given size
 * 
 * Returns the same value as the generator
 * 
 * @example `chunks(3)(range())` generates [0, 1, 2], [3, 4, 5], [6, 7, 8], ...
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param {number} [size=1] The size of the chunks to generate
 * @returns chunk generator
 */

export function chunks<T, TReturn = any, TNext = any> (size: number = 1) {
  const asyncFunctor = asyncChunks(size)
  const syncFunctor = syncChunks(size)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as G;
  }
}

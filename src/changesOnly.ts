export function asyncChangesOnly<T, TReturn = any, TNext = any> (diff: (_0: T, _1: T) => number) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let last: T = (iterator = await g.next(next)).value as T
    if (iterator.done) return iterator.value
    next = yield last
    while (!(iterator = await g.next(next)).done) {
      if (diff(last, iterator.value as T) === 0) {
        continue
      }
      last = iterator.value as T
      next = yield last
    }
    return iterator.value as TReturn
  }
}

export function syncChangesOnly<T, TReturn = any, TNext = any> (diff: (_0: T, _1: T) => number) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let last: T = (iterator = g.next(next)).value as T
    if (iterator.done) return iterator.value
    next = yield last
    while (!(iterator = g.next(next)).done) {
      if (diff(last, iterator.value as T) === 0) {
        continue
      }
      last = iterator.value as T
      next = yield last
    }
    return iterator.value as TReturn
  }
}

/**
 * changesOnly returns a generator that yields a value only if it is different from the last yielded value
 * 
 * Example: `changesOnly((a, b) => a - b)(fromArray([1, 1, 2, 1, 3, 3]))` generates 1, 2, 1, 3
 * 
 * @param diff a function that returns 0 if the two values are equal, and a non-zero value otherwise
 * @returns 
 */

export function changesOnly<T, TReturn = any, TNext = any> (diff: (_0: T, _1: T) => number) {
  const asyncFunctor = asyncChangesOnly(diff)
  const syncFunctor = syncChangesOnly(diff)

  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (typeof g[Symbol.asyncIterator] === 'function') {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as G
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as G
  }
}

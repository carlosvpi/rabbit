function asyncMap<T, U, TReturn = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => U) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<U, TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = await g.next(next)).done) {
      next = yield f(iterator.value as T, i++, next)
    }
    return iterator.value
  }
}

function syncMap<T, U, TReturn = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => U) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<U, TReturn, TNext> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = g.next(next)).done) {
      next = yield f(iterator.value as T, i++, next)
    }
    return iterator.value
  }
}

/**
 * `map(f)(g)` generates items `f(e, i, n)` where `e` are items of `g`, `i` is the index of `e` in `g` and `n` is the `next` passed to get `e`.
 * 
 * `map(f)(g)` returns the same value as `g`.
 * 
 * **Example** `map(x => x * 2)(range(0, 5))` generates 0, 2, 4, 6, 8
 * @param {function} [f] The function to apply to elements of `g`
 */

export function map<T, U = T, TReturn = any, TNext = any>(f: (_0: T, _1: number, _2: TNext) => U) {
  const asyncFunctor = asyncMap(f)
  const syncFunctor = syncMap(f)
  function functor (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<U, TReturn, TNext>
  function functor (g: Generator<T, TReturn, TNext>): Generator<U, TReturn, TNext>
  function functor (g: Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>): Generator<U, TReturn, TNext> | AsyncGenerator<U, TReturn, TNext> {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as AsyncGenerator<U, TReturn, TNext>;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as Generator<U, TReturn, TNext>;
  }
  return functor
}

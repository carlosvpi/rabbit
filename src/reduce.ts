function asyncReduce<T, U = T, TReturn = any, TNext = any> (f: (_0: U, _1: T, _2: number, _3: TNext) => U, u: U) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<U, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let i = 0
    while (!(iterator = await g.next(next)).done) {
      next = yield u = f(u, iterator.value as T, i++, next)
    }
    return iterator.value
  }
}

function syncReduce<T, U = T, TReturn = any, TNext = any> (f: (_0: U, _1: T, _2: number, _3: TNext) => U, u: U) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<U, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let i = 0
    while (!(iterator = g.next(next)).done) {
      next = yield u = f(u, iterator.value as T, i++, next)
    }
    return iterator.value
  }
}

/**
 * `reduce(f, dflt)(g)` generates items `r[i] = f(r[i-1], e)`, and `r[0] = d` and returns the return value of `g`
 * 
 * **Example** `reduce((acc, x) => acc + x, 0)(range(0, 5))` generates 0, 1, 3, 6, 10
 * @param {function} [f] The function to apply to combine elements of `g`
 * @param {function} [u] The default value. If `undefined`, the first item of `g` is taken as default.
 */

export function reduce<T, U = T, TReturn = any, TNext = any> (f: (_0: U, _1: T, _2: number, _3: TNext) => U, u: U) {
  const asyncFunctor = asyncReduce(f, u)
  const syncFunctor = syncReduce(f, u)

  function functor (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<U, TReturn, TNext>
  function functor (g: Generator<T, TReturn, TNext>): Generator<U, TReturn, TNext>
  function functor (g: Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>): Generator<U, TReturn, TNext> | AsyncGenerator<U, TReturn, TNext> {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as  AsyncGenerator<U, TReturn, TNext>;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as Generator<U, TReturn, TNext>;
  }
  return functor
}

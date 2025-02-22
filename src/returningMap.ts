function asyncReturningMap<T, TReturn=any, UReturn = TReturn, TNext=any> (returnMap: (_: TReturn, _1: number, _2: TNext) => UReturn) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, UReturn, TNext> {
    let next: TNext
    let i = 0
    let iterator: IteratorResult<T>
    while (!(iterator = await g.next(next)).done) {
      i++
      next = yield iterator.value
    }
    return returnMap(iterator.value, i, next)
  }
}

function syncReturningMap<T, TReturn=any, UReturn = TReturn, TNext=any> (returnMap: (_: TReturn, _1: number, _2: TNext) => UReturn) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, UReturn, TNext> {
    let next: TNext
    let i = 0
    let iterator: IteratorResult<T>
    while (!(iterator = g.next(next)).done) {
      i++
      next = yield iterator.value
    }
    return returnMap(iterator.value, i, next)
  }
}

/**
 * 
 * `returningMap(f)(g)` generates the same as `g`, and when `g` returns `value`, `returningMap(f)(g)` returns `f(value, i, next)` (with `i` the length of `g` and `next` the value used to generate it)
 * 
 * @param returnMap the function to apply. It takes the return value of `g`, the length of `g` and the last `next` value.
 * @returns 
 */

export function returningMap<T, TReturn=any, UReturn = TReturn, TNext=any> (returnMap: (_: TReturn, _1: number, _2: TNext) => UReturn) {
  const asyncFunctor = asyncReturningMap<T, TReturn, UReturn, TNext>(returnMap)
  const syncFunctor = syncReturningMap<T, TReturn, UReturn, TNext>(returnMap)
  function functor (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, UReturn, TNext>
  function functor (g: Generator<T, TReturn, TNext>): Generator<T, UReturn, TNext>
  function functor (g: Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>): Generator<T, UReturn, TNext> | AsyncGenerator<T, UReturn, TNext> {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as AsyncGenerator<T, UReturn, TNext>;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as Generator<T, UReturn, TNext>;
  }
  return functor
}

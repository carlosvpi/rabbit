function asyncDropWhile<T, TReturn = any, TNext = any> (p: (_0: T, _1: number) => boolean, returnValue?: TReturn) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let i: number = 0
    while (!(iterator = await g.next(next)).done && p((iterator.value as unknown) as T, i++)) {}
    if (iterator.done) return returnValue ?? iterator.value
    next = yield iterator.value as T
    while (!(iterator = await g.next(next)).done) {
      next = yield iterator.value as T
    }
    return returnValue ?? iterator.value
  }
}

function syncDropWhile<T, TReturn = any, TNext = any> (p: (_0: T, _1: number) => boolean, returnValue?: TReturn) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let i: number = 0
    while (!(iterator = g.next(next)).done && p((iterator.value as unknown) as T, i++)) {}
    if (iterator.done) return returnValue ?? iterator.value
    next = yield iterator.value as T
    while (!(iterator = g.next(next)).done) {
      next = yield iterator.value as T
    }
    return returnValue ?? iterator.value
  }
}

/**
 * `dropWhile(p)(g)` drops items `e` of `g` as long `p(e, i)` holds (`i` is the index of `e` in `g`).
 * 
 * After dropping the items, it generates the same as `g` and returns either the specified value or, if not specified, the same as `g`.
 * 
 * **Example** `dropWhile(x => x % 6 !== 5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {Function} [p] The predicate that is checked against items of `g`
 */

export function dropWhile<T, TReturn = any, TNext = any> (p: (_0: T, _1: number) => boolean, returnValue?: TReturn) {
  const asyncFunctor = asyncDropWhile(p, returnValue)
  const syncFunctor = syncDropWhile(p, returnValue)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as G;
  }
}

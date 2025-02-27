function asyncDrop<T, TReturn = any, TNext = any> (n: number = 0, returnValue?: TReturn) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    while (n-- > 0 && !iterator?.done) {
      iterator = await g.next(next)
    }
    if (iterator?.done) return returnValue ?? iterator?.value
    while (!(iterator = await g.next(next)).done) {
      next = yield iterator.value as T
    }
    return returnValue ?? iterator.value
  }
}

function syncDrop<T, TReturn = any, TNext = any> (n: number = 0, returnValue?: TReturn) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    while (n-- > 0 && !iterator?.done) {
      iterator = g.next(next)
    }
    if (iterator?.done) return returnValue ?? iterator?.value
    while (!(iterator = g.next(next)).done) {
      next = yield iterator.value as T
    }
    return returnValue ?? iterator.value
  }
}

/**
 * `drop(n)(g)` drops `n` items `e` of `g`. After dropping the items, it generates the same as `g` and returns the same as `g`.
 * 
 * If `g` is shorter than `n`, `drop` returns `g`'s return value when it ends.
 * 
 * **Example** `drop(5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {number} [n] The amount of items to drop
 */

export function drop<T, TReturn = any, TNext = any> (n: number = 0, returnValue?: TReturn) {
  const asyncFunctor = asyncDrop(n, returnValue)
  const syncFunctor = syncDrop(n, returnValue)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, TReturn, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, TReturn, TNext>) as G;
  }
}

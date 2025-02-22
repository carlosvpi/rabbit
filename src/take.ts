function asyncTake<T, TReturn = any, TNext = any> (n: number = 1, returnValue?: TReturn) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let i: IteratorResult<T, TReturn>
    while (n-- && !(i = await g.next(next)).done) {
      next = yield i.value as T
    }
    if (i.done) {
      return i.value
    }
    return returnValue
  }
}

function syncTake<T, TReturn = any, TNext = any> (n: number = 1, returnValue?: TReturn) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
    let next: TNext
    let i: IteratorResult<T, TReturn>
    while (n-- && !(i = g.next(next)).done) {
      next = yield i.value as T
    }
    if (i.done) {
      return i.value
    }
    return returnValue
  }
}

/**
 * `take(n)(g)` generates the first `n` (**default** 1) items of `g`
 * 
 * If `g` runs out before reaching `n` elements, `take(n, value)(g)` returns the return value of `g`. Otherwise, it returns `value`.
 * 
 * **Example** `take(5)(range())` generates 0, 1, 2, 3, 4
 * @param {number} [n = 1] The amount of items to generate
 * @param {TReturn} [returnValue] The value to return if `g` runs out
 */

export function take<T, TReturn = any, TNext = any> (n: number = 1, returnValue?: TReturn) {
  const asyncFunctor = asyncTake(n, returnValue)
  const syncFunctor = syncTake(n, returnValue)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, any, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, any, TNext>) as G;
  }
}

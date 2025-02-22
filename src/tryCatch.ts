function asyncTryCatch<T, TReturn = any, TNext = any> (onCatch: (e: Error) => TReturn, doFinally?: () => void) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, (TReturn|Error)[], TNext> {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    try {
      while (!(iterator = await g.next(next)).done) {
        next = yield iterator.value as T
      }
      return [iterator.value, null]
    } catch(err) {
      return [null, onCatch(err)]
    } finally {
      if (typeof doFinally === 'function') {
        doFinally()
      }
    }
  }
}

function syncTryCatch<T, TReturn = any, TNext = any> (onCatch: (e: Error) => TReturn, doFinally?: () => void) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, (TReturn|Error)[], TNext> {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    try {
      while (!(iterator = g.next(next)).done) {
        next = yield iterator.value as T
      }
      return [iterator.value, null]
    } catch(err) {
      return [null, onCatch(err)]
    } finally {
      if (typeof doFinally === 'function') {
        doFinally()
      }
    }
  }
}

/**
 * `tryCatch(onCatch)(«1, 2, throw 'Error 1', 3, throw 'Error 2' | 'A'») = «1, 2 | [null, 'Error 2']»
 * 
 * `tryCatch(onCatch)(«1, 2, 3 | 'A'») = «1, 2, 3 | ['A', null]»
 * 
 * @param onCatch 
 * @returns 
 */

export function tryCatch<T, TReturn = any, TNext = any> (onCatch: (e: Error) => TReturn, doFinally?: () => void) {
  const asyncFunctor = asyncTryCatch(onCatch, doFinally)
  const syncFunctor = syncTryCatch(onCatch, doFinally)
  return function<G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>> (g: G): G {
    if (g[Symbol.asyncIterator]) {
      return asyncFunctor(g as AsyncGenerator<T, any, TNext>) as G;
    }
    return syncFunctor(g as Generator<T, any, TNext>) as G;
  }
}

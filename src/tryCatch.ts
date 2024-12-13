/**
 * `tryCatch(onCatch)(«1, 2, throw 'Error 1', 3, throw 'Error 2' | 'A'») = «1, 2 | [null, 'Error 2']»
 * 
 * `tryCatch(onCatch)(«1, 2, 3 | 'A'») = «1, 2, 3 | ['A', null]»
 * 
 * @param onCatch 
 * @returns 
 */

export function tryCatch<T, TReturn = any, TNext = any> (onCatch: (e: Error) => TReturn) {
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
    }
  }
}

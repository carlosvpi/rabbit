/**
 * `asyncTryCatch(onCatch)(«promise(1), promise(2), throw 'Error 1', promise(3), throw 'Error 2' | 'A'») = «promise(1), promise(2) | [null, 'Error 2']»
 * 
 * `asyncTryCatch(onCatch)(«promise(1), promise(2), promise(3) | 'A'») = «promise(1), promise(2), promise(3) | ['A', null]»
 * 
 * @see tryCatch
 * @param onCatch 
 * @returns 
 */

export function asyncTryCatch<T, TReturn = any, TNext = any> (onCatch: (e: Error) => TReturn) {
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
    }
  }
}

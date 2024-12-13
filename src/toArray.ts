/**
 * `toArray(g)` generates all values of `g` and collects them into an array. It ignores the return of `g`.
 * 
 * ```typescript
 * toArray(«1, 2 | 'A'») = [1, 2]
 * ```
 * @param g 
 * @returns 
 */

export function toArray<T, TReturn = any, TNext = any> (g: Generator<T, TReturn, TNext>): T[] {
  let iterator: IteratorResult<T, TReturn>
  let result: T[] = []
  while(!(iterator = g.next()).done) {
    result.push(iterator.value as T)
  }
  return result
}

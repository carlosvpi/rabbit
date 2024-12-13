/**
 * `asynscToArray(g)` generates all values of `g` and collects them into an array. It ignores the return of `g`.
 * 
 * ```typescript
 * await asynscToArray(«response1.json(), response2.json() | 'A'») = [data1, data2]
 * ```
 * @param g 
 * @returns 
 */

export async function asyncToArray<T, TReturn = any, TNext = any> (g: AsyncGenerator<T, TReturn, TNext>): Promise<T[]> {
  let iterator: IteratorResult<T, TReturn>
  let result: T[] = []
  while(!(iterator = await g.next()).done) {
    result.push(iterator.value as T)
  }
  return result
}

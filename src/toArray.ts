async function asyncToArray<T, TReturn = any, TNext = any> (g: AsyncGenerator<T, TReturn, TNext>): Promise<T[]> {
  let iterator: IteratorResult<T, TReturn>
  let result: T[] = []
  while(!(iterator = await g.next()).done) {
    result.push(iterator.value as T)
  }
  return result
}

function syncToArray<T, TReturn = any, TNext = any> (g: Generator<T, TReturn, TNext>): T[] {
  let iterator: IteratorResult<T, TReturn>
  let result: T[] = []
  while(!(iterator = g.next()).done) {
    result.push(iterator.value as T)
  }
  return result
}

/**
 * `toArray(g)` generates all values of `g` and collects them into an array. It ignores the return of `g`.
 * 
 * ```typescript
 * toArray(«1, 2 | 'A'») = [1, 2]
 * ```
 * @param g 
 * @returns 
 */

export function toArray<T, TReturn = any, TNext = any> (g: AsyncGenerator<T, TReturn, TNext>): Promise<T[]>
export function toArray<T, TReturn = any, TNext = any> (g: Generator<T, TReturn, TNext>): T[]

export function toArray<T, TReturn = any, TNext = any> (g: AsyncGenerator<T, TReturn, TNext> | Generator<T, TReturn, TNext>): Promise<T[]> | T[] {
  if (g[Symbol.asyncIterator]) {
    return asyncToArray(g as AsyncGenerator<T, TReturn, TNext>) as Promise<T[]>;
  }
  return syncToArray(g as Generator<T, TReturn, TNext>) as T[];
}

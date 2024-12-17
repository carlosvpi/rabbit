/**
 * ```typescript
 * toAsync(«1, 2 | 'A'») = [Promise.resolve(1), Promise.resolve(2) | 'A']
 * ```
 * 
 * `toAsync(g)` takes a synchronous generators and generates its items asynchronously. It returns the same value as `g`.
 * 
 * @param g a synchronous generator
 * @returns the equivalent asynchronous generator
 */

export async function* toAsync<T, TReturn = any, TNext = any> (
  g: Generator<T, TReturn, TNext>
): AsyncGenerator<T, TReturn, TNext> {
  let next: TNext
  let iterator: IteratorResult<T, TReturn>
  while(!(iterator = g.next(next)).done) {
    next = yield await Promise.resolve(iterator.value as T)
  }
  return iterator.value as TReturn
}

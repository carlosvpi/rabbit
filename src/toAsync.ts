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

// export function toAsync<T, TReturn = any, TNext = any> (g: Generator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
//   return {
//     next: (next: TNext) => Promise.resolve(g.next(next)),
//     return: (value: TReturn) => Promise.resolve({ value, done: this.done = true }),
//     throw: (e?: Error) => {this.done = true; throw e},
//     [Symbol.asyncIterator]: async function* () {
//       let iterator: IteratorResult<Promise<T>, TReturn>
//       let next: TNext
//       while (!(iterator = _g.next(next)).done) {
//         next = yield Promise.resolve(await iterator.value as T)
//       }
//       return iterator.value as TReturn
//     }
//   }
// }

export function awaitDebounce<T>(ms: number, v?: T): Promise<T> {
  return new Promise((r: (_?:T) => void) => {
    setTimeout(() => r(v), ms)
  })
}

export function debounce<T, TReturn = any, TNext = any> (ms: number) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn> | null = await g.next(next)
    while (!iterator.done) {
      let value = iterator.value
      while (iterator = await Promise.race([g.next(next), awaitDebounce<null>(ms, null)])) {
        value = iterator.value
      }
      next = yield Promise.resolve(value as T)
      iterator = await g.next(next)
      continue
    }
    return iterator.value as TReturn
  }
}

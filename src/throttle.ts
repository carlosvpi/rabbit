function awaitThrottle<T, TReturn = any, TNext = any>(ms: number, asyncGenerator: AsyncGenerator<T, TReturn, TNext>, next: TNext): Promise<IteratorResult<T, TReturn>> {
  return new Promise(resolve => {
    let locked = true
    const resolver = (iteratorResult: IteratorResult<T, TReturn>) => {
      if (locked) {
        asyncGenerator.next(next).then(resolver)
      } else {
        resolve(iteratorResult)
      }
    }
    setTimeout(() => {
      locked = false
    }, ms)
    asyncGenerator.next(next).then(resolver)
  })
}

export function throttle<T, TReturn = any, TNext = any> (ms: number) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn> = await g.next(next)
    if (iterator.done) return iterator.value
    next = yield Promise.resolve(iterator.value as T)
    while (!(iterator = await awaitThrottle(ms, g, next)).done) {
      next = yield Promise.resolve(iterator.value as T)
    }
    return iterator.value as TReturn
  }
}

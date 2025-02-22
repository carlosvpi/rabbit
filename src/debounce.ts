export function debounce<T, TReturn = any, TNext = any> (ms: number) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext
    let iterator: IteratorResult<T, TReturn>
    let promised: IteratorResult<T, TReturn> | void
    let p: Promise<IteratorResult<T, TReturn>>
    let timeout: Promise<void>
    let timedout: () => void
    p = g.next(next)
    while (!(iterator = await p).done) {
      p = g.next(next)
      timeout = new Promise(r => timedout = r)
      while (promised = await Promise.race([p, new Promise<void>(r => setTimeout(() => {r(); timedout()}, ms))])) {
        if (promised.done) {
          await timeout
          yield iterator.value as T
          return promised.value as TReturn
        }
        iterator = promised
        timeout = new Promise(r => timedout = r)
        p = g.next(next)
      }
      yield iterator.value as T
    }
    return iterator.value as TReturn
  }
}

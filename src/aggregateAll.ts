/**
 * 
 * Combines multiple asynchronous generators into a single generator.
 * 
 * Yields the list of the latest values from each generator every time any generator yields.
 * 
 * Returns the list of return values of each generator when all have returned.
 * 
 * @example
 * ```typescript
 * clock              0   1   2   3   4   5   6   7   8   9
 * a                 «a   b           e           h   i | y»
 * b                 «        c   d       f   g | x»
 * aggregateAll      «a-  b-  bc  bd  ed  ef  eg| hg  ig| xy»
 * ```
 * @see aggregateRace
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param gs Array of asynchronous generators
 * @returns aggregated generator
 */

export async function* aggregateAll<T, TReturn = any, TNext = any> (...gs: AsyncGenerator<T, TReturn, TNext>[]): AsyncGenerator<T[], TReturn[], TNext> {
  const results: TReturn[] = []
  const stored: IteratorResult<T[], TReturn[]>[] = []
  stored.push = stored.push.bind(stored)
  let next: TNext
  let values: T[] = []
  let freeLocks: ((_: TNext) => void)[] = gs.map(() => () => {})
  let remainingGenerators: number = gs.length
  let resolver: (iteratorResult: IteratorResult<T[], TReturn[]>) => void
  gs.forEach(async (g, i) => {
    let iterator: IteratorResult<T, TReturn>
    while (!(iterator = await g.next(next)).done) {
      freeLocks[i](next)
      values = [...values]
      values[i] = iterator.value as T
      resolver({ value: values as T[], done: false })
      resolver = stored.push
      await new Promise(resolve => freeLocks[i] = resolve)
    }
    results[i] = iterator.value as TReturn
    if (--remainingGenerators) return
    resolver({ value: results as TReturn[], done: true })
    resolver = stored.push
  })
  let iterator: IteratorResult<T[], TReturn[]>
  while(!(iterator = await new Promise<IteratorResult<T[], TReturn[]>>(resolve => {
    if (stored.length) {
      resolve(stored.splice(0, 1)[0])
    } else {
      resolver = resolve
    }
  })).done) {
    next = yield iterator.value as T[]
    freeLocks.forEach(freeLock => freeLock(next))
  }
  return iterator.value as TReturn[]
}

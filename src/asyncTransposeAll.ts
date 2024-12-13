/**
 * `asyncTransposeAll(g1, ..., gn)` generates items `[e1, ..., en]` where `ei` is an item of `gi` (generated with the same `next` value) until the last one of them finishes
 * 
 * When one generator `gi` finishes and returns a value, `asyncTransposeAll(g1, ..., gn)` does not include this value in its yield. Instead, yields an `undefined` in location `i`.
 * 
 * When all the generators finish, `asyncTransposeAll(g1, ..., gn)` returns an array with all its return values.
 * 
 * **Example** `asyncTransposeAll (fromArray(['a', 'b', 'c'], 'd'), range(0, 4, 1, 100))` generates `['a', 0]`, `['b', 1]`, `['c', 2]`, `[undefined, 3]`, and returns `['d', 100]`
 * @param {array} [gs] The array of generators to mix
 */

export async function* asyncTransposeAll<T, TReturn = any, TNext = any> (...gs: AsyncGenerator<T, TReturn, TNext>[]): AsyncGenerator<T[], TReturn[], TNext> {
  let next: TNext
  let done = false
  const returnValues: TReturn[] = Array(gs.length).fill(null)
  while (!done) {
    done = true
    const value = await Promise.all(gs.map(async (g, i: number) => {
      const iterator: IteratorResult<T, TReturn> = await g.next(next)
      if (iterator.done) {
        returnValues[i] ||= iterator.value
        return undefined
      }
      done = false
      return iterator.value
    }))
    if (done) return returnValues
    next = yield value as T[]
  }
}

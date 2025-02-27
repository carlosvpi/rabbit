async function* asyncTransposeAll<T, TReturn = any, TNext = any> (...gs: AsyncGenerator<T, TReturn, TNext>[]): AsyncGenerator<T[], TReturn[], TNext> {
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

function* syncTransposeAll<T, TReturn = any, TNext = any> (...gs: Generator<T, TReturn, TNext>[]): Generator<T[], TReturn[], TNext> {
  let next: TNext
  let done = false
  const returnValues: TReturn[] = Array(gs.length).fill(null)
  while (!done) {
    done = true
    const value = gs.map((g, i: number) => {
      const iterator: IteratorResult<T, TReturn> = g.next(next)
      if (iterator.done) {
        returnValues[i] ||= iterator.value
        return undefined
      }
      done = false
      return iterator.value
    })
    if (done) return returnValues
    next = yield value as T[]
  }
}

/**
 * `transposeAll(g1, ..., gn)` generates items `[e1, ..., en]` where `ei` is an item of `gi` (generated with the same `next` value) until the last one of them finishes
 * 
 * When one generator `gi` finishes and returns a value, `transposeAll(g1, ..., gn)` does not include this value in its yield. Instead, yields an `undefined` in location `i`.
 * 
 * When all the generators finish, `transposeAll(g1, ..., gn)` returns an array with all its return values.
 * 
 * **Example** `transposeAll (fromArray(['a', 'b', 'c'], 'd'), range(0, 4, 1, 100))` generates `['a', 0]`, `['b', 1]`, `['c', 2]`, `[undefined, 3]`, and returns `['d', 100]`
 * @param {array} [gs] The array of generators to mix
 */

export function transposeAll<T, TReturn = any, TNext = any> (...gs: AsyncGenerator<T, TReturn, TNext>[]): AsyncGenerator<T[], TReturn[], TNext>
export function transposeAll<T, TReturn = any, TNext = any> (...gs: Generator<T, TReturn, TNext>[]): Generator<T[], TReturn[], TNext>

export function transposeAll<T, TReturn = any, TNext = any> (...gs: AsyncGenerator<T, TReturn, TNext>[] | Generator<T, TReturn, TNext>[]): AsyncGenerator<T[], TReturn[], TNext> | Generator<T[], TReturn[], TNext> {
  if (gs.length === 0) return
  if (gs[0][Symbol.asyncIterator]) {
    return asyncTransposeAll(...gs as AsyncGenerator<T, TReturn, TNext>[]) as AsyncGenerator<T[], TReturn[], TNext>;
  }
  return syncTransposeAll(...gs as Generator<T, TReturn, TNext>[]) as Generator<T[], TReturn[], TNext>;
}

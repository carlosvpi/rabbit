/**
 * `mixRace(g1, ..., gn)` generates items `[e1, ..., en]` where `ei` is an item of `gi` (generated with the same `next` value) until the first one of them finishes
 * 
 * When one or more generators `gi` return `vi`, `mixRace(g1, ..., gn)` returns an array with `vi` in positions `i`, and `undefined` everywhere else
 * 
 * **Example** `mixRace (fromArray(['a', 'b', 'c'], 200), range(0, 4, 1, 100))` generates `['a', 0]`, `['b', 1]`, `['c', 2]` and returns `[200, undefined]`
 * @param {array} [gs] The array of generators to mix
 */

export function* mixRace<T, TReturn = any, TNext = any> (...gs: Generator<T, TReturn, TNext>[]): Generator<T, TReturn[], TNext> {
  let done: boolean = false
  let next: TNext
  const returnValue: TReturn[] = Array(gs.length).fill(undefined)
  while (!done) {
    const value = gs.map((g, i: number) => {
      const iteratorResult = g.next(next)
      if (!iteratorResult.done) return iteratorResult.value
      done = true
      returnValue[i] = iteratorResult.value
    })
    if (done) return returnValue
    next = yield value as T
  }
}

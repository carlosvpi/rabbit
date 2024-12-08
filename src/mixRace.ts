/**
 * `mixRace(g1, ..., gn)` generates items `[e1, ..., en]` where `ei` is an item of `gi` until the first one of them finishes
 * 
 * **Example** `mixRace (fromArray('a', 'b', 'c'), range(0, 4))` generates ['a', 0], ['b', 1], ['c', 2]
 * @param {array} [gs] The array of generators to mix
 */

export function* mixRace<T, I> (...gs: Generator<T, any, I | undefined>[]) {
  let input: I | undefined = undefined
  let done = false
  while (!done) {
    done = false
    const value = gs.map(g => {
      const iteratorResult = g.next(input)
      if (iteratorResult.done) done = true
      return iteratorResult.value
    })
    if (done) return
    input = yield value
  }
}

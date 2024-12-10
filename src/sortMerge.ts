/**
 * If `g` and `h` are sorted generators (according to `sort`), then `sortMerge(h, sort)(g)` generates the items of `g` and `h` following order given by `sort`.
 * 
 * `sortMerge(h, sort)(g)` returns `[v, w]` if `g` returns `v` and `h` returns `w`.
 * 
 * **Example** `sortMerge(range(0, 10, 2), (a, b) => a - b)(range(1, 11, 2))` gives 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
 * 
 * @param {Generator} [h] The generator whose values will be inserted in the output, in order.
 * @param {function} [sort] The sorting function. `sort(a, b) < 0` iff a < b. `sort(a, b) == 0` if a = b. `sort(a, b) > 0` if a > b.
 */

export function sortMerge<T, TReturn = any, TNext = any> (h: Generator<T, TReturn, TNext>, sort: (_0: T, _1: T) => number) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn[], TNext> {
    let next: TNext[] = []
    let gNextIndex: number = 0
    let hNextIndex: number = 0
    let gIterator: IteratorResult<T, TReturn> = g.next(next[gNextIndex])
    let hIterator: IteratorResult<T, TReturn> = h.next(next[hNextIndex])
    while (!gIterator.done && !hIterator.done) {
      if (sort(gIterator.value as T, hIterator.value as T) <= 0) {
        next.push(yield gIterator.value as T)
        gIterator = g.next(next[gNextIndex++])
      } else {
        next.push(yield hIterator.value as T)
        hIterator = h.next(next[hNextIndex++])
      }
    }
    if (!gIterator.done) next.push(yield gIterator.value as T)
    if (!hIterator.done) next.push(yield hIterator.value as T)
    while (!gIterator.done && !(gIterator = g.next(next[gNextIndex++])).done) {
      next.push(yield gIterator.value as T)
    }
    while (!hIterator.done && !(hIterator = h.next(next[hNextIndex++])).done) {
      next.push(yield hIterator.value as T)
    }
    return [gIterator.value, hIterator.value]
  }
}

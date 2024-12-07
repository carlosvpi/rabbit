/**
 * if `g` and `h` are sorted generators (according to `sort`), then `sortMerge(h, sort)(g)` generates the items of `g` and `h` following order given by `sort`.
 * 
 * **Example** `sortMerge(range(0, 10, 2), (a, b) => a - b)(range(1, 11, 2))` gives 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
 * 
 * @param {Generator} [h] The generator whose values will be inserted in the output, in order.
 * @param {function} [sort] The sorting function. `sort(a, b) < 0` iff a < b. `sort(a, b) == 0` if a = b. `sort(a, b) > 0` if a > b.
 */

export function sortMerge<T> (h: Generator<T>, sort: (_0: T, _1: T) => number) {
  return function* (g: Generator<T>) {
    let gCursor = g.next()
    let hCursor = h.next()
    while (!gCursor.done && !hCursor.done) {
      if (sort(gCursor.value, hCursor.value) <= 0) {
        yield gCursor.value
        gCursor = g.next()
      } else {
        yield hCursor.value
        hCursor = h.next()
      }
    }
    if (!gCursor.done) yield gCursor.value
    if (!hCursor.done) yield hCursor.value
    yield* g
    yield* h
  }
}

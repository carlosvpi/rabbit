/**
 * if `g` is a sorted generator (according to `sort`), then `sortInsert(item, sort)(g)` generates the items of `g` including `item` following order given by `sort`.
 * 
 * **Example** `sortInsert(5, (a, b) => a - b)(range(0, 10, 2))` generates 0, 2, 4, 5, 6, 8
 * 
 * @param {T} [item] The item to insert in the generated output
 * @param {function} [sort] The sorting function. `sort(a, b) < 0` iff a < b. `sort(a, b) == 0` if a = b. `sort(a, b) > 0` if a > b.
 */

export function sortInsert<T> (item: T, sort: (_0: T, _1: T) => number) {
  return function* (g: Generator<T>) {
    let cursor: IteratorResult<T>
    while (!(cursor = g.next()).done) {
      if (sort(item, cursor.value) <= 0) {
        yield item
        yield cursor.value
        yield* g
        return
      }
      yield cursor.value
    }
    yield item
  }
}
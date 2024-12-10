/**
 * If `g` is a sorted generator (according to `sort`), then `sortInsert(item, sort)(g)` generates the items of `g` including `item` following order given by `sort`.
 * 
 * `sortInsert(item, sort)(g)` provides to `g` consecutive `next` values, irrespective of the insertion of the item.
 * 
 * **Example** `sortInsert(5, (a, b) => a - b)(range(0, 10, 2))` generates 0, 2, 4, 5, 6, 8
 * 
 * @param {T} [item] The item to insert in the generated output
 * @param {function} [sort] The sorting function. `sort(a, b) < 0` iff a < b. `sort(a, b) == 0` if a = b. `sort(a, b) > 0` if a > b.
 */

export function sortInsert<T, TReturn = any, TNext = any> (item: T, sort: (_0: T, _1: T) => number) {
  return function* (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
    let next: TNext
    let previousNext: TNext
    let iterator: IteratorResult<T>
    let inserted: boolean = false
    while (!(iterator = g.next(next)).done) {
      if (sort(item, iterator.value) <= 0) {
        next = yield item
        inserted = true
        break
      }
      next = yield iterator.value as T
    }
    if (!inserted) {
      yield item
      return iterator.value as TReturn
    }
    previousNext = next
    next = yield iterator.value
    while (!(iterator = g.next(previousNext)).done) {
      previousNext = next
      next = yield iterator.value
    }
    return iterator.value as TReturn
  }
}
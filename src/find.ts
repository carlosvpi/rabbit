/**
 * `find(p)(g)` finds the item in `g` that fulfils `p` (if none does, returns `null`)
 * 
 * `p` is passed each item, the index of the item and the `next` value used to get it.
 * 
 * The return value of `g` is ignored.
 * 
 * **Example** `find(x => x % 5 === 4)(range(0, 5))` returns 4
 * @param {function} [p] The predicate that characterizes the solution, or null if no solution is found
 */

export function find<T, TNext> (p: (_0: T, _1: number, _2: TNext) => boolean) {
  return function (g: Generator<T, any, TNext>): T | null {
    let i = 0
    let iterator: IteratorResult<T>
    let next: TNext
    while (!(iterator = g.next(next)).done) {
      if (p(iterator.value, i++, next)) return iterator.value
    }
    return null
  }
}

/**
 * `find(p)(g)` finds the item in `g` that fulfils `p` (if none does, returns `null`)
 * 
 * **Example** `find(x => x%5 === 4)(range(0, 5))` returns 4
 * @param {function} [p] The predicate that characterizes the solution, or null if no solution is found
 */

export function find<T, U> (p: (_0: T, _1: number) => boolean) {
  return function (g: Generator<T>): T | null {
    let i = 0
    for (let item of g) {
      if (p(item, i++)) return item
    }
    return null
  }
}

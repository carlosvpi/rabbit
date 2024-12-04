/**
 * `headWhile(p)(g)` generates items `e` of `g` as long `p(e, i)` holds (`i` is the index of `e` in `g`)
 * **Example** `headWhile(x => x % 6 !== 5)(range())` generates 0, 1, 2, 3, 4
 * @param {function} [p] The predicate that is checked against items of `g`
 */

export function headWhile<T> (p: (_0: T, _1: number) => boolean) {
  return function* (generator: Generator<T>): Generator<T> {
    let i = 0
    for (let item of generator) {
      if (!p(item, i++)) return
      yield item
    }
  }
}

/**
 * `skipWhile(p)(g)` skips items `e` of `g` as long `p(e, i)` holds (`i` is the index of `e` in `g`). After skipping the items, it generates the same as `g`.
 * 
 * **Example** `skipWhile(x => x % 6 !== 5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {Function} [p] The predicate that is checked against items of `g`
 */

export function skipWhile<T> (p: (_0: T, _1: number) => boolean) {
  return function* (generator: Generator<T>): Generator<T> {
    let i = 0
    let node = generator.next()
    while (!node.done && p(node.value, i++)) {
      node = generator.next()
    }
    if (node.done) return
    yield node.value
    yield* generator
  }
}

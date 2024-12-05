/**
 * `skip(n)(g)` skips `n` items `e` of `g`. After skipping the items, it generates the same as `g`.
 * 
 * **Example** `skip(5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {number} [n] The amount of items to skip
 */

export function skip<T> (n: number) {
  return function* (generator: Generator<T>): Generator<T> {
    while (n-- > 0) {
      generator.next()
    }
    yield* generator
  }
}

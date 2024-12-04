/**
 * `head(n)(g)` generates the first `n` (**default** 1) items of `g`
 * **Example** `head(5)(range())` generates 0, 1, 2, 3, 4
 * @param {number} [n = 1] The amount of items to generate
 */

export function head<T> (n: number = 1) {
  return function* (generator: Generator<T>): Generator<T> {
    for (let item of generator) {
      n--
      if (n < 0) return
      yield item
    }
  }
}

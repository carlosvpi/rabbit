/**
 * `append(g1)(g2)` generates, first, all items from `g2`, and then all items from `g1`
 * 
 * @param {generator} [g1] the generator to append
 */

export function append<T> (object: Generator<T>) {
  return function* (g: Generator<T>) {
    yield* g
    yield* object
  }
}

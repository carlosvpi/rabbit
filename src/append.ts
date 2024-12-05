/**
 * `append(g1)(g2)` generates, first, all items from `g2`, and then all items from `g1`
 * 
 * @param {generator} [g1] the generator to append
 */

export function append<T, I> (object: Generator<I>) {
  return function* (g: Generator<T, any, I>) {
    yield* g
    yield* object
  }
}

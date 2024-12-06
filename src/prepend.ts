/**
 * `prepend(g1)(g2)` generates, first, all items from `g1`, and then all items from `g2`
 * 
 * @param {generator} [g1] the generator to prepend
 */

export function prepend<T> (object: Generator<T>) {
  return function* (g: Generator<T>) {
    yield* object
    yield* g
  }
}

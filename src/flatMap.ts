/**
 * `flatMap(f)(g)`, where `g` is a generator and `f(e)`, for each item `e` of `g`, is another generator, generates (flattening) each value from each `f(e)`.
 * @param {generator} [f] the function from item to generator
 */

export function flatMap<T, U> (f: (_: T) => Generator<U>) {
  return function* (g: Generator<T>) {
    for (let item of g) {
      yield* f(item)
    }
  }
}

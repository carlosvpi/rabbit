/**
 * FeedMap creates a generator whose values depend on its *next* parameter.
 * 
 * `feedMap(f, first).next()` = `f(first)`,
 * `feedMap(f, _).next(n)` = `f(n)`,
 * ...
 * 
 * @param {generator} [f] the function to apply to the *next* parameter
 * @param {generator} [first] the first element to generate
 */

export function* feedMap<T, U> (f: (_: T) => U, first: T): Generator<U, any, T> {
  let param: T = yield f(first)
  while (true) {
    param = yield f(param)
  }
}

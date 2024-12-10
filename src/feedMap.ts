/**
 * FeedMap creates a generator whose values depend on its *next* parameter.
 * 
 * The first call: `feedMap(f, first).next().value` = `f(first)`,
 * 
 * The next calls: `feedMap(f, _).next(n).value` = `f(n)`,
 * 
 * `feedMap(f, first)` never returns.
 * 
 * @param {generator} [f] the function to apply to the *next* parameter
 * @param {generator} [first] the first element to generate
 */

export function* feedMap<T, TNext = T> (f: (_: TNext) => T, first: TNext): Generator<T, never, TNext> {
  let param: TNext = yield f(first)
  while (true) {
    param = yield f(param)
  }
}

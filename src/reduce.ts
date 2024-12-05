/**
 * `reduce(f, dflt)(g)` generates items `r[i] = f(r[i-1], e)`, and `r[0] = d`
 * 
 * **Example** `reduce((acc, x) => acc + x, 0)(range(0, 5))` generates 0, 1, 3, 6, 10
 * @param {function} [f] The function to apply to combine elements of `g`
 * @param {function} [u] The default value. If `undefined`, the first item of `g` is taken as default.
 */


export function reduce<T, U> (f: (_0: U, _1: T, _2: number) => U, u?: U) {
  return function* (generator: Generator<T>): Generator<U> {
    let result: IteratorResult<T>
    let i = 0
    if (u === undefined) {
      result = generator.next()
      u = result.value
      if (result.done) return u
      yield u
    }
    for (let item of generator) {
      yield u = f(u, item, i++)
    }
  }
}

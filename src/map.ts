/**
 * `map(f)(g)` generates items `f(e)` where `e` are items of `g`
 * 
 * **Example** `map(x => x * 2)(range(0, 5))` generates 0, 2, 4, 6, 8
 * @param {function} [f] The function to apply to elements of `g`
 */

export function map<T, U> (f: (_0: T, _1: number) => U) {
  return function* (generator: Generator<T>): Generator<U> {
    let i = 0
    for (let item of generator) {
      yield f(item, i++)
    }
  }
}

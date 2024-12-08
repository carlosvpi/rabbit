/**
 * `tap(f)(g)` applies `f(e)` where `e` are items of `g`, and generates `e` unchanged
 * 
 * @param {function} [f] The function to apply to elements of `g`
 */

export function tap<T> (f: (_0: T, _1: number) => any) {
  return function* (generator: Generator<T>): Generator<T> {
    let i = 0
    for (let item of generator) {
      f(item, i++)
      yield item
    }
  }
}

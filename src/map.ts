export function map<T, U> (f: (_0: T, _1: number) => U) {
  return function* (generator: Generator<T>): Generator<U> {
    let i = 0
    for (let item of generator) {
      yield f(item, i++)
    }
  }
}

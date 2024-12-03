export function reduce<T, U> (f: (_0: U, _1: T, _2: number) => U, u?: U) {
  return function* (generator: Generator<T>): Generator<U> {
    let result: IteratorResult<T>
    let i = 0
    if (u === undefined) {
      result = generator.next()
      u = result.value
      if (result.done) return u
    }
    for (let item of generator) {
      yield u = f(u, item, i++)
    }
  }
}

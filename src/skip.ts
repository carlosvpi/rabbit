export function skip<T> (n: number) {
  return function* (generator: Generator<T>): Generator<T> {
    while (n-- > 0) {
      generator.next()
    }
    yield* generator
  }
}

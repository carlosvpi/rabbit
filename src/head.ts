export function head<T> (n: number = 1) {
  return function* (generator: Generator<T>): Generator<T> {
    for (let item of generator) {
      n--
      if (n < 0) return
      yield item
    }
  }
}

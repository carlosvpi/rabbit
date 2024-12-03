export function slice<T> (start: number = 0, end: number = Infinity, step: number = 1) {
  return function* (generator: Generator<T>): Generator<T> {
    let index = 0
    let result = generator.next()
    while (!result.done && index++ < start) {result = generator.next()}
    while (!result.done && index++ < end) {
      yield result.value
      result = generator.next()
      let _step = step
      while (_step--) {result = generator.next()}
    }
  }
}

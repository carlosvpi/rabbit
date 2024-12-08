export function* tagFeed<T, I = T>(g: Generator<T, any, I>) {
  let x = undefined
  while (true) {
    const result = g.next(x)
    if (!result.done) return
    x = yield [result.value, x]
  }
}
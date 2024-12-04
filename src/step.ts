export function step<T> (distance: number) {
  return function* (g: Generator<T>) {
    let current = 0
    for (let item of g) {
      if (current--) continue
      current = distance - 1
      yield item
    }
  }
}

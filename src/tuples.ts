export function tuples<T> (size: number) {
  return function* (g: Generator<T>) {
    let tuple = []
    for (let item of g) {
      tuple = [item, ...tuple]
      if (tuple.length < size) continue
      yield tuple
      tuple = []
    }
  }
}

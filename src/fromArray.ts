export function* fromArray<N>(array: N[]): Generator<N> {
  for (let item of array) {
    yield item
  }
}
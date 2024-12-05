/**
 * `pick(distances)(g)` generates the items of `g` with such indexes (i[1], ... i[n]), that i[x] - i[x-1] = distances[x]
 * 
 * **Example** `pick([1, 0, 0, 2])(range())` generates 1, 1, 1, 3
 * @param {array} [distances] the array of distances
 */

export function pick<T> (distances: number[]) {
  return function* (g: Generator<T>) {
    let i: number = 0
    let distance: number = distances[0]
    if (!distances.length) return
    for (let item of g) {
      while (i < distances.length && distance === 0) {
        yield item
        distance = distances[++i]
      }
      if (i >= distances.length) return
      distance--
    }
  }
}

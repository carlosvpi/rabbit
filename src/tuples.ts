/**
 * `tuples(size)(g)` gets the elements of `g` grouped into tuples of `size` elements
 * 
 * **Example** `tuples(3)(range())` generates [0, 1, 2], [3, 4, 5], [6, 7, 8], ...
 * 
 * @param {number} [size=1] The size of the tuples to generate
 */

export function tuples<T> (size: number = 1) {
  return function* (g: Generator<T>) {
    let tuple = []
    for (let item of g) {
      tuple.push(item)
      if (tuple.length < size) continue
      yield tuple
      tuple = []
    }
  }
}

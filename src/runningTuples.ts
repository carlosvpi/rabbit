/**
 * `runningTuples(size)(g)` gets the elements of `g` grouped into runningTuples of `size` elements, repeating elements between tuples
 * 
 * **Example** `runningTuples(3)(range())` generates [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], ...
 * 
 * @param {number} [size=1] The size of the tuples to generate
 */

export function runningTuples<T> (size: number = 1) {
  return function* (g: Generator<T>) {
    let tuple = []
    for (let item of g) {
      tuple.push(item)
      if (tuple.length < size) continue
      yield tuple
      tuple = [...tuple]
      tuple.splice(0, 1)
    }
  }
}

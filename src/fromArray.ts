/**
 * `fromArray(array)` generates the items of `array`
 * 
 * **Example** `fromArray([0, 1, 2, 3, 4])` generates 0, 1, 2, 3, 4
 * @param {array} [array] the array
 */

export function* fromArray<N>(array: N[]): Generator<N> {
  for (let item of array) {
    yield item
  }
}
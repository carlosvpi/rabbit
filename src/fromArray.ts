/**
 * `fromArray(array)` generates the items of `array`
 * 
 * Optionally `fromArray(array, value)` returns `value`
 * 
 * **Example** `fromArray([0, 1, 2, 3, 4])` generates 0, 1, 2, 3, 4
 * @param {array} [array] the array
 */

export function* fromArray<T, TReturn = any>(array: T[], returnValue?: TReturn): Generator<T, TReturn, void> {
  for (let item of array) {
    yield item
  }
  return returnValue
}
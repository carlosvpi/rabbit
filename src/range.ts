/**
 * `range(start, end, step)` generates numbers from `start` (included) to `end` (excluded) distanced a `step`, either increasing or decreasing
 * **Example** `range(1, 10)` generates 1, 2, 3, 4, 5, 6, 7, 8, 9
 * **Example** `range(10, 1, 2)` generates 10, 8, 6, 4, 2
 * @param {number} [start=0] The first number in the range
 * @param {number} [end=Infinity] The first number after `start` that is beyond the range
 * @param {number} [step=1] The distance between two numbers in the range. Its sign is not taken into account
 */

export function* range(start: number = 0, end: number = Infinity, step: number = 1) {
  if ((end - start) * step === 0) return
  if ((end - start) * step <= 0) step = -step
  for (let i = start; step > 0 ? i < end : i > end; i+= step) {
    yield i
  }
}
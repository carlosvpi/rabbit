/**
 * `slice(start, end, step)(g)` gets items indexed `i` on `g`, where 0 <= `start` <= `i` < `end`, and if `i` is an index, the next index is `i + step`.
 * 
 * **Example** `slice(5, 10)(range())` generates 5, 6, 7, 8, 9
 * 
 * **Example** `slice(5, 10, 2)(range())` generates 5, 7, 9
 * 
 * `slice(start, end, step)(g)` ~~ `pipe(g, skip(start), head(end - start), step(step))`
 * @param {number} [start=0] The index on `g` of the first item of `g` to generate
 * @param {number} [end=Infinity] The index on `g` of the first item of `g` to not generate
 * @param {number} [step=1] The distance in two consecutive indexes on `g` to generate
 */

export function slice<T> (start: number = 0, end: number = Infinity, step: number = 1) {
  return function* (generator: Generator<T>): Generator<T> {
    let index = 0
    let result = generator.next()
    while (!result.done && index++ < start) {result = generator.next()}
    index--
    while (!result.done && index++ < end) {
      yield result.value
      let _step = step
      while (_step--) {result = generator.next()}
    }
  }
}

/**
 * If `g` and `h` are sorted generators (according to `sort`), then `sortMerge(h, sort)(g)` generates the items of `g` and `h` following order given by `sort`.
 *
 * `sortMerge(h, sort)(g)` returns `[v, w]` if `g` returns `v` and `h` returns `w`.
 *
 * **Example** `sortMerge(range(0, 10, 2), (a, b) => a - b)(range(1, 11, 2))` gives 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
 *
 * @param {Generator} [h] The generator whose values will be inserted in the output, in order.
 * @param {function} [sort] The sorting function. `sort(a, b) < 0` iff a < b. `sort(a, b) == 0` if a = b. `sort(a, b) > 0` if a > b.
 */
export declare function sortMerge<T, TReturn = any, TNext = any>(h: AsyncGenerator<T, TReturn, TNext>, sort: (_0: T, _1: T) => number): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>;
export declare function sortMerge<T, TReturn = any, TNext = any>(h: Generator<T, TReturn, TNext>, sort: (_0: T, _1: T) => number): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>;

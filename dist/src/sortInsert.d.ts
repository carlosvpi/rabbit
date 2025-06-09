/**
 * If `g` is a sorted generator (according to `sort`), then `sortInsert(item, sort)(g)` generates the items of `g` including `item` following order given by `sort`.
 *
 * `sortInsert(item, sort)(g)` provides to `g` consecutive `next` values, irrespective of the insertion of the item.
 *
 * **Example** `sortInsert(5, (a, b) => a - b)(range(0, 10, 2))` generates 0, 2, 4, 5, 6, 8
 *
 * @param {T} [item] The item to insert in the generated output
 * @param {function} [sort] The sorting function. `sort(a, b) < 0` iff a < b. `sort(a, b) == 0` if a = b. `sort(a, b) > 0` if a > b.
 */
export declare function sortInsert<T, TReturn = any, TNext = any>(item: T, sort: (_0: T, _1: T) => number): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

/**
 * `drop(n)(g)` drops `n` items `e` of `g`. After dropping the items, it generates the same as `g` and returns the same as `g`.
 *
 * If `g` is shorter than `n`, `drop` returns `g`'s return value when it ends.
 *
 * **Example** `drop(5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {number} [n] The amount of items to drop
 */
export declare function drop<T, TReturn = any, TNext = any>(n?: number, returnValue?: TReturn): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

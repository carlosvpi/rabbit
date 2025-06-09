/**
 * `last(size)(g)` generates arrays of `size` elements with the last elements generated of `g` (generating always one more). It returns the same as `g`.
 *
 * **Example** `last(3)(range())` generates [0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], ...
 *
 * @param {number} [size=1] The size of the tuples to generate
 */
export declare function last<T, TReturn = any, TNext = any>(size?: number): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

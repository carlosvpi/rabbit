/**
 * `take(n)(g)` generates the first `n` (**default** 1) items of `g`
 *
 * If `g` runs out before reaching `n` elements, `take(n, value)(g)` returns the return value of `g`. Otherwise, it returns `value`.
 *
 * **Example** `take(5)(range())` generates 0, 1, 2, 3, 4
 * @param {number} [n = 1] The amount of items to generate
 * @param {TReturn} [returnValue] The value to return if `g` runs out
 */
export declare function take<T, TReturn = any, TNext = any>(n?: number, returnValue?: TReturn): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

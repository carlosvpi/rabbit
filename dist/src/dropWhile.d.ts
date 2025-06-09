/**
 * `dropWhile(p)(g)` drops items `e` of `g` as long `p(e, i)` holds (`i` is the index of `e` in `g`).
 *
 * After dropping the items, it generates the same as `g` and returns either the specified value or, if not specified, the same as `g`.
 *
 * **Example** `dropWhile(x => x % 6 !== 5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {Function} [p] The predicate that is checked against items of `g`
 */
export declare function dropWhile<T, TReturn = any, TNext = any>(p: (_0: T, _1: number) => boolean, returnValue?: TReturn): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

/**
 *
 * `some(p)(g)` generates false until an element of `g` satisfies a predicate, in which case it generates true.
 *
 * It returns the value that fulfilled `p`, if some did, or the value that returns `g`.
 *
 * `some` does not apply `p` to the return value of `g`.
 *
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns
 */
export declare function some<T, TReturn = any, TNext = any>(p: (_0: T, _1: number, _2: TNext) => boolean): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

/**
 *
 * `every(p)(g)` generates true until an element of `g` no longer satisfies a predicate, in which case it generates false.
 *
 * It returns the value that did not fulfil `p`, if some, or the value that returns `g`.
 *
 * `every` does not apply `p` to the return value of `g`.
 *
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns
 */
export declare function every<T, TReturn = any, TNext = any>(p: (_0: T, _1: number, _2: TNext) => boolean): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

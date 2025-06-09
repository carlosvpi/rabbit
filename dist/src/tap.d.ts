/**
 * `tap(f)(g)` applies `f(e)` where `e` are items of `g`, and generates `e` unchanged. It returns the same as `g`.
 *
 * @param {function} [f] The function to apply to elements of `g`
 */
export declare function tap<T, TReturn = any, TNext = any>(f: (_0: T, _1: number, _2: TNext) => any): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

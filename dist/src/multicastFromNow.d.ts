/**
 * `multicastFromNow(g)` generates independent copies of g.
 *
 * `g` is required to not have a type of `next`
 *
 * The return value of each copy is the same as that of the original generator `g` (but does not replay all previous items generated by `g`).
 *
 * `multicastFromNow(g)` never returns.
 *
 * @param {number} [g] the generator to multicastFromNow
 */
export declare function multicastFromNow<T, TReturn = any>(g: Generator<T, TReturn>): Generator<Generator<T, TReturn>, never>;
export declare function multicastFromNow<T, TReturn = any>(g: AsyncGenerator<T, TReturn>): Generator<AsyncGenerator<T, TReturn>, never>;

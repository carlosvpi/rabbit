/**
 * `multicast(g)` generates independent copies of g.
 *
 * `g` is required to not have a type of `next`
 *
 * The return value of each copy is the same as that of the original generator `g`.
 *
 * `multicast(g)` never returns.
 *
 * **Example** If `[c1, c2] = [...take(2)(multicast(2)(range()))]`, then we can consume all elements of c1 (thus consuming g) without consuming the elements of c2.
 *
 * @param {number} [g] the generator to multicast
 */
export declare function multicast<T, TReturn = any>(g: Generator<T, TReturn>): Generator<Generator<T, TReturn>, never>;
export declare function multicast<T, TReturn = any>(g: AsyncGenerator<T, TReturn>): Generator<AsyncGenerator<T, TReturn>, never>;

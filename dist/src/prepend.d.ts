/**
 * `prepend(g1)(g2)` generates, first, all items from `g1`, and then all items from `g2`
 *
 * `next` values passed to `prepend(g1)(g2)` are passed down to `g1`, first, and `g2`, after.
 *
 * The return value of `g1` is ignored. The return value of `prepend(g1)(g2)` is that of `g2`.
 *
 * @param {generator} [object] the generator to prepend
 */
export declare function prepend<T, TReturn = any, TNext = any>(object: AsyncGenerator<T, TReturn, TNext>): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>;
export declare function prepend<T, TReturn = any, TNext = any>(object: Generator<T, TReturn, TNext>): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>;

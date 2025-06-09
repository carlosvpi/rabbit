/**
 * Puts a generator after another generator
 *
 * `append(g1)(g2)` yields all items from `g2`, and then all items from `g1`.
 *
 * Returns the return value of `g1`.
 *
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param {generator} [object] the generator to append
 * @returns generator
 */
export declare function append<T, TReturn = any, TNext = any>(object: AsyncGenerator<T, TReturn, TNext>): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>;
export declare function append<T, TReturn = any, TNext = any>(object: Generator<T, TReturn, TNext>): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>;

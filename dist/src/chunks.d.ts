/**
 * Divides a generator in chunks of a given size
 *
 * Returns the same value as the generator
 *
 * @example `chunks(3)(range())` generates [0, 1, 2], [3, 4, 5], [6, 7, 8], ...
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param {number} [size=1] The size of the chunks to generate
 * @returns chunk generator
 */
export declare function chunks<T, TReturn = any, TNext = any>(size?: number): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

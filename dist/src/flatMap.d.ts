/**
 * `flatMap(f)(g)`, where `g` is a generator and `f(e, i)`, for each item `e` of `g` and index `i` of `e`, is another generator, generates (flattening) each value from each `f(e)`.
 *
 * All the returning values of the generators created by `g` are put into a list and returned by `flatMap(f)(g)`, preceded by the return value of `f` itself.
 *
 * @param {generator} [f] the function from item to generator
 */
export declare function flatMap<T, U, TReturn = any, UReturn = any, TNext = any>(f: (_: T, _1: number) => Generator<U, UReturn, TNext>): (g: Generator<T, TReturn, TNext>) => Generator<U, UReturn, TNext>;
export declare function flatMap<T, U, TReturn = any, UReturn = any, TNext = any>(f: (_: T, _1: number) => AsyncGenerator<U, UReturn, TNext>): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<U, UReturn, TNext>;

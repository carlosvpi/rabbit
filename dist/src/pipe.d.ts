/**
 * `pipe(...c)(g)` generates items of `g` and passes them through the generator constructors `c_i`
 *
 * **Example** `pipe(drop(5), take(10), filter(x => x % 2 === 0))(range())` generates 6, 8, 10, 12, 14
 * @param {Array} [constructors] The generator constructors
 */
export declare function pipe<T, TReturn = any, TNext = any>(...constructors: ((_: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>)[]): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>;
export declare function pipe<T, TReturn = any, TNext = any>(...constructors: ((_: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>)[]): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>;

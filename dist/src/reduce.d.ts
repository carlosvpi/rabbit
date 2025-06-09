/**
 * `reduce(f, dflt)(g)` generates items `r[i] = f(r[i-1], e)`, and `r[0] = d` and returns the return value of `g`
 *
 * **Example** `reduce((acc, x) => acc + x, 0)(range(0, 5))` generates 0, 1, 3, 6, 10
 * @param {function} [f] The function to apply to combine elements of `g`
 * @param {function} [u] The default value. If `undefined`, the first item of `g` is taken as default.
 */
export declare function reduce<T, U = T, TReturn = any, TNext = any>(f: (_0: U, _1: T, _2: number, _3: TNext) => U, u: U): {
    (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<U, TReturn, TNext>;
    (g: Generator<T, TReturn, TNext>): Generator<U, TReturn, TNext>;
};

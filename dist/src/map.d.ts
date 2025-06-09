/**
 * `map(f)(g)` generates items `f(e, i, n)` where `e` are items of `g`, `i` is the index of `e` in `g` and `n` is the `next` passed to get `e`.
 *
 * `map(f)(g)` returns the same value as `g`.
 *
 * **Example** `map(x => x * 2)(range(0, 5))` generates 0, 2, 4, 6, 8
 * @param {function} [f] The function to apply to elements of `g`
 */
export declare function map<T, U = T, TReturn = any, TNext = any>(f: (_0: T, _1: number, _2: TNext) => U): {
    (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<U, TReturn, TNext>;
    (g: Generator<T, TReturn, TNext>): Generator<U, TReturn, TNext>;
};

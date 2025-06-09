/**
 *
 * `returningMap(f)(g)` generates the same as `g`, and when `g` returns `value`, `returningMap(f)(g)` returns `f(value, i, next)` (with `i` the length of `g` and `next` the value used to generate it)
 *
 * @param returnMap the function to apply. It takes the return value of `g`, the length of `g` and the last `next` value.
 * @returns
 */
export declare function returningMap<T, TReturn = any, UReturn = TReturn, TNext = any>(returnMap: (_: TReturn, _1: number, _2: TNext) => UReturn): {
    (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, UReturn, TNext>;
    (g: Generator<T, TReturn, TNext>): Generator<T, UReturn, TNext>;
};

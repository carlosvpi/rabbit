/**
 * `yieldReturnValue(g)` generates the same values as g, but at also yields the return value of `g`.
 *
 * @param g `
 */
export declare function yieldReturnValue<T, TReturn = any, TNext = any>(g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext>;
export declare function yieldReturnValue<T, TReturn = any, TNext = any>(g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext>;

/**
 *
 * `returning(value)(g)` generates the same as `g`, and when `g` ends, returns `value`
 *
 * @param returnValue The value to return
 * @returns
 */
export declare function returning<T, TReturn = any, TNext = any>(returnValue: TReturn): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

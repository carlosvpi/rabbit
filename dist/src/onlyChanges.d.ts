export declare function asyncOnlyChanges<T, TReturn = any, TNext = any>(diff: (_0: T, _1: T) => number): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>;
export declare function syncOnlyChanges<T, TReturn = any, TNext = any>(diff: (_0: T, _1: T) => number): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>;
/**
 * onlyChanges is a generator that filters out duplicate values.
 *
 * Example: `onlyChanges((a, b) => a - b)(fromArray([1, 1, 2, 1, 3, 3]))` generates 1, 2, 1, 3
 *
 * @param diff
 * @returns
 */
export declare function onlyChanges<T, TReturn = any, TNext = any>(diff: (_0: T, _1: T) => number): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

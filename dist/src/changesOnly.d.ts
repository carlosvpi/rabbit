export declare function asyncChangesOnly<T, TReturn = any, TNext = any>(diff: (_0: T, _1: T) => number): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>;
export declare function syncChangesOnly<T, TReturn = any, TNext = any>(diff: (_0: T, _1: T) => number): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>;
/**
 * changesOnly returns a generator that yields a value only if it is different from the last yielded value
 *
 * Example: `changesOnly((a, b) => a - b)(fromArray([1, 1, 2, 1, 3, 3]))` generates 1, 2, 1, 3
 *
 * @param diff a function that returns 0 if the two values are equal, and a non-zero value otherwise
 * @returns
 */
export declare function changesOnly<T, TReturn = any, TNext = any>(diff: (_0: T, _1: T) => number): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

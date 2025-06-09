/**
 * `tryCatch(onCatch)(«1, 2, throw 'Error 1', 3, throw 'Error 2' | 'A'») = «1, 2 | [null, 'Error 2']»
 *
 * `tryCatch(onCatch)(«1, 2, 3 | 'A'») = «1, 2, 3 | ['A', null]»
 *
 * @param onCatch
 * @returns
 */
export declare function tryCatch<T, TReturn = any, TNext = any>(onCatch: (e: Error) => TReturn, doFinally?: () => void): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

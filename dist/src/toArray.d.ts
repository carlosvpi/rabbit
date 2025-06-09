/**
 * `toArray(g)` generates all values of `g` and collects them into an array. It ignores the return of `g`.
 *
 * ```typescript
 * toArray(«1, 2 | 'A'») = [1, 2]
 * ```
 * @param g
 * @returns
 */
export declare function toArray<T, TReturn = any, TNext = any>(g: AsyncGenerator<T, TReturn, TNext>): Promise<T[]>;
export declare function toArray<T, TReturn = any, TNext = any>(g: Generator<T, TReturn, TNext>): T[];

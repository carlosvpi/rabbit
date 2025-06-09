/**
 *
 * Combines multiple asynchronous generators into a single generator.
 *
 * Yields the list of the latest values from each generator every time any generator yields.
 *
 * Returns the list of return values of each generator when all have returned.
 *
 * @example
 * ```typescript
 * clock              0   1   2   3   4   5   6   7   8   9
 * a                 «a   b           e           h   i | y»
 * b                 «        c   d       f   g | x»
 * aggregateAll      «a-  b-  bc  bd  ed  ef  eg| hg  ig| xy»
 * ```
 * @see aggregateRace
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param gs Array of asynchronous generators
 * @returns aggregated generator
 */
export declare function aggregateAll<T, TReturn = any, TNext = any>(...gs: AsyncGenerator<T, TReturn, TNext>[]): AsyncGenerator<T[], TReturn[], TNext>;

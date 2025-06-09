/**
 *
 * `returns(g)` returns the returning value of the generator g
 *
 * @param g
 * @returns
 */
export declare function returns<T = any, TReturn = T, TNext = any>(g: Generator<any, TReturn, TNext>): TReturn;
export declare function returns<T = any, TReturn = T, TNext = any>(g: AsyncGenerator<any, TReturn, TNext>): Promise<TReturn>;

export declare function throttle<T, TReturn = any, TNext = any>(ms: number): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>;

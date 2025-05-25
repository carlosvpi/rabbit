export type SyncOp<T = any, TReturn = any, TNext = any> = (_: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
export type AsyncOp<T = any, TReturn = any, TNext = any> = (_: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>
export type CheckStop<T, TReturn> = (stop: (_?: TReturn) => void, each: (_: (_1: T, _2: number) => void) => void) => void
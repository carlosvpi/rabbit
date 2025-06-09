/**
 *
 * `awaitPromise(promiseFactory, checStop)` emits the result of consecutive calls to the promiseFactory.
 *
 * `promiseFactory` is passed the current index and the `next` value passed to `awaitPromise`.
 *
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 *
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param promiseFactory The factory of promises to await
 * @param checkStop The function called on every emitted event to check whether to continue
 * @returns the asynchronous generator
 */
import { CheckStop } from "./types";
export declare function awaitPromise<T, TReturn = any, TNext = any>(promiseFactory: (_0: number, _1: TNext) => Promise<T>, checkStop?: CheckStop<T, TReturn>): AsyncGenerator<T, TReturn, TNext>;

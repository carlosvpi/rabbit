/**
 *
 * `awaitInterval(ms, checkStop)` emits an item every `ms` milliseconds. The item emitted is the Date.now() value at the moment of emision.
 *
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 *
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param ms interval milliseconds
 * @param checkStop function called on every item to check if the interval should stop
 * @returns the asynchronous generator
 */
import { CheckStop } from "./types";
export declare function awaitInterval<TReturn = any, TNext = any>(ms: number, checkStop?: CheckStop<number, TReturn>): AsyncGenerator<number, TReturn, TNext>;

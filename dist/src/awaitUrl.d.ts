import { CheckStop } from "./types";
/**
 * `awaitUrl(target, eventName, options, checkStop)` emits on every change of URL hash.
 *
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitUrl` removes the event listener and returns `v`.
 *
 * Emits every click event until the 10th one, when it returns `'end'`
 *
 * @example
 * ```typescript
 * awaitUrl(button, 'click', {}, (stop, _, i) => i === 10 && stop('end')))
 * ```
 *
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param target The target element to listen to
 * @param eventName The name of the event
 * @param options Options for addEventListener
 * @param checkStop Function called on every item to check if the listener should be removed
 * @returns the asynchronous generator
 */
export declare function awaitUrl<T = any, TReturn = any, TNext = any>(checkStop?: CheckStop<T, TReturn>): AsyncGenerator<Awaited<T> | Awaited<TReturn>, Awaited<TReturn>, TNext>;

export type Caller<T, TReturn = any, TNext = any> = [
    AsyncGenerator<T, TReturn, TNext>,
    (value: T) => Promise<TNext>,
    (result: TReturn) => void
];
/**
 *
 * Use "push(value)" to make the async generator yield a value.
 *
 * Use "stop(value)" to make the async generator return a value.
 *
 * "push(value)" returns a promise resolved with the value used to generate the next one.
 *
 * @example `awaitCall(([g, push, stop]) => {push(1); push(2); stop(3)})`
 * @example `const [g, push, stop] = new Promise(awaitCall); push(1); push(2); stop(3)`
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param caller function passed "generator", "push" and "stop"
 * @returns the asynchronous generator
 */
export declare function awaitCall<T = any, TReturn = any, TNext = any>(caller: (_: Caller<T, TReturn, TNext>) => void): AsyncGenerator<T, TReturn, TNext>;

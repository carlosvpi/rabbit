/**
 * 
 * `awaitPromise(promiseFactory, checStop)` emits the result of consecutive calls to the promiseFactory.
 * 
 * `promiseFactory` is passed the current index and the `next` value passed to `awaitPromise`.
 * 
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 * 
 * @param promiseFactory The factory of promises to await
 * @param checkStop The function called on every emitted event to check whether to continue
 * @returns the asynchronous generator
 */

export async function* awaitPromise<T, TReturn = any, TNext = any> (
  promiseFactory: (_0: number, _1: TNext) => Promise<T>,
  checkStop: (stop: (_?: TReturn) => void, _0?: T, _1?: number, _2?: TNext) => void = () => undefined
): AsyncGenerator<T, TReturn, TNext> {
  let next: TNext
  let i: number = 0
  let returnValue: TReturn
  let iterate: boolean = true
  let item: T
  const stop = (result: TReturn) => {
    iterate = false
    returnValue = result
  }
  checkStop(stop, item, i, next)
  while(iterate) {
    next = yield item = await promiseFactory(i++, next)
    checkStop(stop, item, i, next)
  }
  return returnValue
}
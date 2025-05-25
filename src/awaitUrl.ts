import { CheckStop } from "./types"

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

export async function* awaitUrl<T = any, TReturn = any, TNext = any> (
  checkStop: CheckStop<T, TReturn> = () => {}
) {
  let next: TNext
  let i: number = 0
  let iterator: IteratorResult<T, TReturn>
  let items: IteratorResult<T, TReturn>[] = []
  let isPromiseFree: boolean = true
  let f: (_: IteratorResult<T, TReturn>) => void
  let currentEach
  const stop = (result: TReturn) => {
    if (items.at(-1)?.done) return
    items.push({ value: result, done: true })
  }
  const handler = (value: T) => {
    if (!items.at(-1)?.done) {
      items.push({ value, done: false })
    }
    if (isPromiseFree) {
      f(items.splice(0, 1)[0])
      isPromiseFree = false
    }
    currentEach?.(value, i++)
  }
  this.addEventListener('hashchange', handler)
  checkStop(stop, (each: (_1: T, _2: number) => void) => {currentEach = each})
  while(!(iterator = await new Promise<IteratorResult<T, TReturn>>(r => {
    if (items.length) {
      r(items.splice(0, 1)[0])
    } else {
      f = r
      isPromiseFree = true
    }
  })).done) {
    next = yield Promise.resolve(iterator.value)
  }
  this.removeEventListener('hashchange', handler)
  return iterator.value
}

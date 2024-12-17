
type EventListener<T> = (_0: string, _1: (_: T) => void, _2?: {}) => void

/**
 * `awaitEvent(target, eventName, options, checkStop)` adds an eventListener to the `target` and every time the event fires it is generated asynchronously by `awaitEvent`.
 * 
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 * 
 * **Example**
 * 
 * ```typescript
 * awaitEvent(button, 'click', {}, (stop, _, i) => i === 10 && stop('end')))
 * ```
 * 
 * Emits every click event until the 10th one, when it returns `'end'`
 * 
 * @param target The target element to listen to
 * @param eventName The name of the event
 * @param options Options for addEventListener
 * @param checkStop Function called on every item to check if the listener should be removed
 * @returns 
 */

export async function* awaitEvent<T = any, TReturn = any, TNext = any> (
  target: { emit: (_:T) => void, addEventListener: EventListener<T>, removeEventListener: EventListener<T>},
  eventName: string,
  options: {} = {},
  checkStop: (stop: (_: TReturn) => void, _0?: IteratorResult<T, TReturn>, _1?: number, _2?: TNext) => void = () => undefined
) {
  let next: TNext
  let i: number = 0
  let iterator: IteratorResult<T, TReturn>
  let items: IteratorResult<T, TReturn>[] = []
  let isPromiseFree: boolean = true
  let f: (_: IteratorResult<T, TReturn>) => void
  const stop = (result: TReturn) => {
    if (items.at(-1)?.done) return
    items.push({ value: result, done: true })
  }
  const handler = (value: T) => {
    if (!items.at(-1)?.done) {
      items.push({ value, done: false })
    }
    checkStop(stop, iterator, i++, next)
    if (isPromiseFree) {
      f(items.splice(0, 1)[0])
      isPromiseFree = false
    }
  }
  target.addEventListener(eventName, handler, options)
  checkStop(stop, iterator, i, next)
  while(!(iterator = await new Promise<IteratorResult<T, TReturn>>(r => {
    if (items.length) {
      r(items.splice(0, 1)[0])
    } else {
      f = r
      isPromiseFree = true
    }
  })).done) {
    next = yield Promise.resolve(iterator.value)
    checkStop(stop, iterator, i, next)
  }
  target.removeEventListener(eventName, handler)
  return iterator.value
}
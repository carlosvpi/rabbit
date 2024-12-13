
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
  target: { addEventListener: EventListener<T>, removeEventListener: EventListener<T>},
  eventName: string,
  options: {},
  checkStop: (stop: (_?: TReturn) => void, _0?: T, _1?: number, _2?: TNext) => void = () => undefined
) {
  let next: TNext
  let i: number = 0
  let returnValue: TReturn
  let iterate: boolean = true
  let item: T
  let f: (_: T, _1: number, _2: TNext) => void
  const stop = (result: TReturn) => {
    iterate = false
    returnValue = result
  }
  const handler = (evt: any) => {
    f(evt, i++, next)
  }
  target.addEventListener(eventName, handler, options)
  checkStop(stop, item, i, next)
  while(iterate) {
    next = yield item = await new Promise(r => {
      f = r
    })
    checkStop(stop, item, i, next)
  }
  target.removeEventListener(eventName, handler)
  return returnValue
}
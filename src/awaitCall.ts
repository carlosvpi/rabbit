/**
 * 
 * `awaitCall(caller)` exposes as parameters of `caller` two functions: `push` and `stop`.
 * 
 * `push(value)` pushes `value` to the async generator created by `awaitCall(caller)`, and returns a promise resolved with the `next` value used to generate the next one.
 * 
 * `stop(value)` finishes `awaitCall(caller)` making it return `value`.
 * 
 * @param caller function passed "next" and "stop"
 * @returns the asynchronous generator
 */

export async function* awaitCall<T = any, TReturn = any, TNext = any> (
  caller: (push: (_: T) => Promise<TNext>, stop: (_: TReturn) => void) => void
): AsyncGenerator<T, TReturn, TNext> {
  let next: TNext
  let returnValue: TReturn
  let iterate: boolean = true
  let resolver: (value: T | TReturn) => void
  let lastPush: ((value: TNext) => void)[] = []
  let items: (T | TReturn)[] = []
  caller((value: T): Promise<TNext> => {
    items.push(value)
    if (resolver) resolver(items.splice(0, 1)[0])
    return new Promise<TNext>(resolve => lastPush.push((v)=>resolve(v)))
  }, (result: TReturn) => {
    iterate = false
    returnValue = result
    if (resolver) resolver(result)
  })
  while(iterate) {
    const item = await new Promise<T|TReturn>(resolve => {
      if (items.length) {
        resolve(items.splice(0, 1)[0])
        return
      }
      resolver = resolve
    })
    if (iterate) lastPush.splice(0, 1)[0](next = yield item as T)
  }
  return returnValue
}

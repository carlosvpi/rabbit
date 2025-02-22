export type Caller<T, TReturn = any, TNext = any> = [
  AsyncGenerator<T, TReturn, TNext>,
  (value: T) => Promise<TNext>,
  (result: TReturn) => void
]

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

export function awaitCall<T = any, TReturn = any, TNext = any> (
  caller: (_: Caller<T, TReturn, TNext>) => void
): AsyncGenerator<T, TReturn, TNext> {
  let next: TNext
  let returnValue: TReturn
  let iterate: boolean = true
  let resolver: (value: T | TReturn) => void
  let lastPush: ((value: TNext) => void)[] = []
  let items: (T | TReturn)[] = []
  const g = (async function* () {
    while(iterate) {
      const item = await new Promise<T|TReturn>(resolve => {
        if (items.length) {
          resolve(items.splice(0, 1)[0])
          return
        }
        resolver = resolve
      })
      if (lastPush.length) lastPush.splice(0, 1)[0](next = yield item as T)
    }
    while (items.length) {
      lastPush.splice(0, 1)[0](next = yield items.splice(0, 1)[0] as T)
    }
    return returnValue
  })()
  caller([
    g,
    (value: T): Promise<TNext> => {
      if (!iterate) return Promise.resolve(null)
      items.push(value)
      if (resolver) {
        resolver(items.splice(0, 1)[0])
        resolver = null
      }
      return new Promise<TNext>(resolve => lastPush.push((v)=>resolve(v)))
    },
    (result: TReturn) => {
      iterate = false
      returnValue = result
      if (resolver) resolver(result)
    }
  ])
  return g
}

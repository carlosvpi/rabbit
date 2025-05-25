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

import { CheckStop } from "./types"

export async function* awaitInterval<TReturn = any, TNext = any> (
  ms: number,
  checkStop: CheckStop<number, TReturn> = () => {}
): AsyncGenerator<number, TReturn, TNext> {
  let next: TNext
  let i: number = 0
  let returnValue: TReturn
  let iterate: boolean = true
  let item: number
  let f: (_: number, _1: number, _2: TNext) => void
  let currentEach
  const stop = (result?: TReturn) => {
    iterate = false
    returnValue = result
  }
  const token = setInterval(() => {
    const now = Date.now()
    f(now, i++, next)
    currentEach?.(now, i)
  }, ms)
  checkStop(stop, (each: (_1: number, _2: number) => void) => {currentEach = each})
  while(iterate) {
    next = yield item = await new Promise<number>(r => {
      f = r
    })
  }
  clearInterval(token)
  return returnValue
}
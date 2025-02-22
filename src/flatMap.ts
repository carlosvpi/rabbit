/**
 * `flatMap(f)(g)`, where `g` is a generator and `f(e, i)`, for each item `e` of `g` and index `i` of `e`, is another generator, generates (flattening) each value from each `f(e)`.
 * 
 * All the returning values of the generators created by `g` are put into a list and returned by `flatMap(f)(g)`, preceded by the return value of `f` itself.
 * 
 * @param {generator} [f] the function from item to generator
 */

export function flatMap<T, U, TReturn = any, UReturn = any, TNext = any> (f: (_: T, _1: number) => Generator<U, UReturn, TNext>): (g: Generator<T, TReturn, TNext>) => Generator<U, UReturn, TNext>
export function flatMap<T, U, TReturn = any, UReturn = any, TNext = any> (f: (_: T, _1: number) => AsyncGenerator<U, UReturn, TNext>): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<U, UReturn, TNext>

export function flatMap<T, U, TReturn = any, UReturn = any, TNext = any> (f: (_: T, _1: number) => AsyncGenerator<U, UReturn, TNext> | Generator<U, UReturn, TNext>) {
  return function (g: AsyncGenerator<T, TReturn, TNext> | Generator<T, TReturn, TNext>): AsyncGenerator<U, UReturn, TNext> | Generator<U, UReturn, TNext> {
    const returnValue: (TReturn | UReturn)[] = []
    let gIterator: IteratorResult<T, TReturn>
    let next: TNext
    let i: number = 0
    if (g[Symbol.asyncIterator]) {
      return (async function* () {
        while (!(gIterator = await g.next(next)).done) {
          let eIterator: IteratorResult<U, UReturn>
          const e = f(gIterator.value as T, i++)
          if (e[Symbol.asyncIterator]) {
            while (!(eIterator = await e.next(next)).done) {
              next = yield(eIterator.value)
            }
          } else {
            while (!(eIterator = (e as Generator<U, UReturn, TNext>).next(next)).done) {
              next = yield(eIterator.value)
            }
          }
          returnValue.push(eIterator.value)
        }
        return [gIterator.value, ...returnValue]
      })() as AsyncGenerator<U, UReturn, TNext>
    }
    gIterator = (g as Generator<T, TReturn, TNext>).next(next)
    if (gIterator.done) {
      return (function*(){ return [gIterator.value] })() as Generator<U, UReturn, TNext>
    }
    let eIterator: IteratorResult<U, UReturn>
    const e = f(gIterator.value as T, i++)
    if (e[Symbol.asyncIterator]) {
      return (async function* () {
        while (!(eIterator = await e.next(next)).done) {
          next = yield(eIterator.value)
        }
        returnValue.push(eIterator.value)
        while (!(gIterator = (g as Generator<T, TReturn, TNext>).next(next)).done) {
          let eIterator: IteratorResult<U, UReturn>
          const e = f(gIterator.value as T, i++)
          while (!(eIterator = await e.next(next)).done) {
            next = yield(eIterator.value)
          }
          returnValue.push(eIterator.value)
        }
        return [gIterator.value, ...returnValue]
      })() as AsyncGenerator<U, UReturn, TNext>
    }
    return (function* () {
      while (!(eIterator = (e as Generator<U, UReturn, TNext>).next(next)).done) {
        next = yield(eIterator.value)
      }
      returnValue.push(eIterator.value)
      while (!(gIterator = (g as Generator<T, TReturn, TNext>).next(next)).done) {
        let eIterator: IteratorResult<U, UReturn>
        const e = f(gIterator.value as T, i++)
        while (!(eIterator = (e as Generator<U, UReturn, TNext>).next(next)).done) {
          next = yield(eIterator.value)
        }
        returnValue.push(eIterator.value)
      }
      return [gIterator.value, ...returnValue]
    })() as Generator<U, UReturn, TNext>
  }
}

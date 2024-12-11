/**
 * `multicast(n)(g)` creates `n` independent copies of g.
 * 
 * `g` is required to not have a type of `next`
 * 
 * The return value of each copy is the same as that of the original generator `g`.
 * 
 * **Example** If `[c1, c2] = multicast(2)(range())`, then we can consume all elements of c1 (thus consuming g) without consuming the elements of c2.
 * 
 * @param {number} [n] the amount of copies to create
 */

export function multicast<T, TReturn = any> (n: number) {
  return function (g: Generator<T, TReturn>) {
    const stored = []
    let done: boolean = false
    let result: TReturn
    return Array(n).fill(null).map(() => {
      const constructor = function* () {
        let i = 0
        let iterator: IteratorResult<T, TReturn>
        while (true) {
          if (i === stored.length) {
            iterator = g.next()
            if (iterator.done) return result ||= iterator.value
            stored.push(iterator.value)
          }
          yield stored[i++]
        }
      }
      return constructor()
    })
  }
}

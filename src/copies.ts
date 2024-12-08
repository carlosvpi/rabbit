/**
 * `copies(n)(g)` creates `n` independent copies of g. 
 * 
 * **Example** If `[c1, c2] = copies(2)(range())`, then we can consume all elements of c1 (thus consuming g) without consuming the elements of c2.
 * 
 * @param {number} [n] the amount of copies to create
 */

export function copies<T> (n: number) {
  return function (g: Generator<T>) {
    const stored = []
    return Array(n).fill(null).map(() => {
      const constructor = function* () {
        let i = 0
        while (true) {
          if (i === stored.length) {
            const iterator = g.next()
            if (iterator.done) return
            stored.push(iterator.value)
          }
          yield stored[i]
          i++
        }
      }
      return constructor()
    })
  }
}

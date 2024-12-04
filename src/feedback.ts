/**
 * `feed(g, f)` generates items `g_e` of `g` through `g.next(f_e)`, where `f_e` are items of `f` through `f.next(g_e). The first `f_e` is `undefined`, so the first `g_e` obtained with feed from `f` is its second one (with `f`'s first item)
 * @param {generator} [g] the main generator
 * @param {generator} [feed] the feeding generator
 * @see feed
 */

export function* feedback<T, I> (g: Generator<T, any, I>, feed?: Generator<I>) {
  let gCursor: IteratorResult<T, any>
  let feedCursor: IteratorResult<I, any> | undefined = undefined
  do {
    gCursor = g.next(feedCursor?.value)
    if (!gCursor.done) yield gCursor.value
    if (feed && !feedCursor?.done) feedCursor = feed.next(gCursor.value)
  } while (!gCursor.done)
}

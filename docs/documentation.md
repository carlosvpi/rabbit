## Notation

A generator that produces values `1`, `2` and `3`, should not be represented as `[1, 2, 3]`, as that represents, instead, an array. In order to represent the generator, this document follows the notation `«1, 2, 3»`.

A generator that, after producing its values (say, `1`, `2`, `3`), returns a value `v`, is represented like `«1, 2, 3 | v»`.

Finally, when a what a generator `g` yields depends on the argument of `g.next()` (say, it doubles that argument), that is represented like `«1 ‹x› x * 2»` (the items are `1` and `x * 2`, separated by `‹x›`, which identifies the argument passed to `g.next()`).

The `«‹›|»` notation is used throughout this document to easily convey the semantics of each operator.

## Operators

### aggregateAll

```typescript
clock              0   1   2   3   4   5   6   7   8   9
a                 «a   b           e           h   i | y»
b                 «        c   d       f   g | x»
aggregateAll      «a-  b-  bc  bd  ed  ef  eg| hg  ig| xy»
```

Combines multiple asynchronous generators into a single generator.

Yields the list of the latest values from each generator every time any generator yields.

Returns the list of return values of each generator when all have returned.

### aggregateRace

```typescript
clock              0   1   2   3   4   5   6   7   8   9
a                 «a   b           e           h   i | y»
b                 «        c   d       f   g | x»
aggregateAll      «a-  b-  bc  bd  ed  ef  eg| x»
```

Combines multiple asynchronous generators into a single generator.

Yields the list of the latest values from each generator every time any generator yields.

Returns the value returned by the first generator that returns.

### append

```typescript
append(«4, 5, 6 | 'A'»)(«1, 2, 3 | 'B'») = «1, 2, 3, 4, 5, 6 | 'A'»
```

`append(g1)(g2)` generates, first, all items from `g2`, and then all items from `g1`

`next` values passed to `append(g1)(g2)` are passed down to `g2`, first, and `g1`, after.

The return value of `g2` is ignored. The return value of `append(g1)(g2)` is that of `g1`.

```typescript
function append<T, TReturn = any, TNext = any> (object: Generator<T, TReturn, TNext>): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

**Example**

`append(range(5))(range(0, 5))` generates `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...`

### awaitCall

```typescript
awaitCall(async (push, stop) => {
  console.log(await push(1))
  console.log(await push(2))
  console.log(await push(3))
  stop('End')
}) = «1 ‹x› 2 ‹y› 3 ‹z› | 'End'» // and prints the values of `x`, `y` and `z`
```

`awaitCall(caller)` exposes as parameters of `caller` two functions: `push` and `stop`, and the resulting generator `g`.

`push(value)` pushes `value` to the async generator created by `awaitCall(caller)`, and returns a promise resolved with the `next` value used to generate the next one.

`stop(value)` finishes `awaitCall(caller)` making it return `value`.

```typescript
async function* awaitCall<T = any, TReturn = any, TNext = any> (
  caller: (push: (_: T) => Promise<TNext>, stop: (_: TReturn) => void, g: AsyncGenerator<T, TReturn, TNext>) => void
): AsyncGenerator<T, TReturn, TNext>
```

**Example**

```typescript
awaitCall((push, stop) => {
  push
})
```

### awaitEvent

`awaitEvent(target, eventName, options, checkStop)` adds an eventListener to the `target` and every time the event fires it is generated asynchronously by `awaitEvent`.

`checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.

```typescript
async function* awaitEvent<T = any, TReturn = any, TNext = any> (
  target: { addEventListener: EventListener<T>, removeEventListener: EventListener<T>},
  eventName: string,
  options: {},
  checkStop: (stop: (_?: TReturn) => void, _0?: T, _1?: number, _2?: TNext) => void = () => undefined
): AsyncGenerator<number, TReturn, TNext>
```

**Example**

```typescript
awaitEvent(button, 'click', {}, (stop, _, i) => i === 10 && stop('end')))
```

Emits every click event until the 10th one, when it returns `'end'`

### awaitInterval

`awaitInterval(ms, checkStop)` emits an item every `ms` milliseconds. The item emitted is the Date.now() value at the moment of emision.

`checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.

```typescript
async function* awaitInterval<TReturn = any, TNext = any> (
  ms: number,
  checkStop: (stop: (_?: TReturn) => void, _0?: number, _1?: number, _2?: TNext) => void = () => undefined
): AsyncGenerator<number, TReturn, TNext>
```

### awaitPromise

`awaitPromise(promiseFactory, checStop)` emits the result of consecutive calls to the promiseFactory.

`promiseFactory` is passed the current index and the `next` value passed to `awaitPromise`.

`checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.

```typescript
async function* awaitPromise<T, TReturn = any, TNext = any> (
  promiseFactory: (_0: number, _1: TNext) => Promise<T>,
  checkStop: (stop: (_?: TReturn) => void, _0?: T, _1?: number, _2?: TNext) => void = () => undefined
): AsyncGenerator<T, TReturn, TNext>
```

**Example**

`awaitPromise(() => fetch(url))` fetches the `url` every time it is invoked.

### changesOnly

```typescript
chunks(3)(«1, 2, 2, 3, 1, 3, 3, 2 | 'R'») = «1, 2, 3, 1, 3, 2»
```

`changesOnly` returns a generator that yields a value only if it is different from the last yielded value

### chunks

```typescript
chunks(3)(«1, 2, 3, 4, 5, 6, 7, 8 | 'R'») = «[1, 2, 3], [4, 5, 6], [7, 8] | 'R'»
```

`chunks(size)(g)` gets the elements of `g` grouped into chunks of `size` elements

For each item of a chunk, `g` is invoked with the same `next` value.

```typescript
function chunks<T, TReturn = any, TNext = any> (size: number = 1): (g: Generator<T, TReturn, TNext>) => Generator<T[], TReturn, TNext>
```

**Example**

`chunks(3)(range())` generates `[0, 1, 2]`, `[3, 4, 5]`, `[6, 7, 8]`, ...

### debounce

```typescript
clock           0   1   2   3   4   5   6   7   8   9
g              «A           B   C       D         |'A'»
debounce(2)(g) «        A           C           D |'A'»
```

`debounce(ms)(g)` debounces the items of `g` `ms` milliseconds. This means that when `g` generates an item `e`, `debounce(ms)(g)` sets a timeout of `ms` milliseconds; if `g` did not generate any other item, `debounce` generates `e`. If, instead, `g` generates another item `f` during that time, `debounce` discards `e` and sets another timeout.

`debounce` returns the same as `g`.

### drop

```typescript
drop(3, 'B')(«1, 2, 3, 4, 5, 6, 7 | 'A'») = «4, 5, 6, 7 | 'B'»
```

`drop(n)(g)` drops `n` items `e` of `g`. After dropping the items, it generates the same as `g` and returns the same as `g`.

If `g` is shorter than `n`, `drop` returns `g`'s return value when it ends.

```typescript
function drop<T, TReturn = any, TNext = any> (n: number = 0, returnValue?: TReturn): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

**Example**

`drop(5)(range(0, 10))` generates 5, 6, 7, 8, 9

### dropWhile

```typescript
dropWhile(x => x % 10 !== 4, 'B')(«52, 43, 34, 25, 16 | 'A'») = «34, 25, 16 | 'B'»
```

`dropWhile(p)(g)` drops items `e` of `g` as long `p(e, i)` holds (`i` is the index of `e` in `g`).

After dropping the items, it generates the same as `g` and returns either the specified value or, if not specified, the same as `g`.

```typescript
function dropWhile<T, TReturn = any, TNext = any> (p: (_0: T, _1: number) => boolean, returnValue?: TReturn): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

**Example**

`dropWhile(x => x % 6 !== 5)(range(0, 10))` generates 5, 6, 7, 8, 9

### every

```typescript
every(x => x % 2 === 1)(«1, 3, 5, 6, 7, 8») = «true, true, true, false | 6»
```

`every(p)(g)` generates true until an element of `g` no longer satisfies a predicate, in which case it generates false.

It returns the value that did not fulfil `p`, or the value that returns `g`.

`every` does not apply `p` to the return value of `g`.

```typescript
function every<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean): (g: Generator<T, TReturn, TNext>) => Generator<boolean, T | null, TNext>
```

### feed

```typescript
feed(«1, 2, 3, 4 | 'A'»)(«1, x: 2**x, x: 3**x, x:5**x, x:7**x | 'B'») = «1, 2, 27, 625 | ['B', 'A']»
```

`feed(feeder)(g)` is simmilar to `g`, except that items are obtained passing what `feeder` generates to `g.next`.

* The first time, `feed(feeder)(g).next(x) ~~ g.next(x)`
* For any successive call `feed(feeder)(g).next(x) ~~ g.next(feeder.next(x))`
* If the generator `g` returns `value`, `feedback(feeder)(g)` returns `[value, null]`
* If the `feeder` returns `value`, `feedback(feeder)(g)` returns `[null, value]`
* If both the generator `g` and `feeder` return `value1` and `value2` at the same time, `feedback(feeder)(g)` returns `[value1, value2]`

```typescript
function feed<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any> (feeder: Generator<TNext, any, TFeederNext>): (g: Generator<T, any, TNext>) => Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>
```

**Example**

If `feeder` generates numbers `0`, `1`, `2`, ...

and `g.next(n)` generates `2 * (n ?? 0)`

Then `feed(feeder)(g)` generates `0`, `2`, `4`, ...

### feedback

```typescript
feedback(«1 ‹x› 10 * x ‹x› x**2 | 'A'»)(«1 ‹x› x + 1 ‹x› x + 2 ‹x› x + 3 | 'B'») = «1, 2, 22, 487 | ['B', 'A']»
```

`feedback(feeder)(g)` is simmilar to `g`, except that items are obtained passing what `feeder` generates to `g.next`. Also, `feeder.next` is passed the previous item generated by `g`.

* The first time, `e = feedback(feeder)(g).next() ~~ g.next()`
* For any successive call `e = feedback(feeder)(g).next() ~~ g.next(feeder.next(e))`
* If the generator `g` returns `value`, `feedback(feeder)(g)` returns `[value, null]`
* If the `feeder` returns `value`, `feedback(feeder)(g)` returns `[null, value]`
* If both the generator `g` and `feeder` return `value1` and `value2` at the same time, `feedback(feeder)(g)` returns `[value1, value2]`

```typescript
function feedback<T, TReturn = any, TFeederReturn = any, TNext = any> (feeder: Generator<TNext, TFeederReturn, T>): (g: Generator<T, TReturn, TNext>) => Generator<T, FeedReturn<TReturn, TFeederReturn>, any>
```

**Example**

If `feeder.next(n)` generates numbers `2 * (n ?? 0)`, ...

and `g.next(n)` generates `1 + (n ?? 0)`

Then `feedback(feeder)(g)` generates `1, 1, 3, 7, 15, 31, ...`

### feedMap

```typescript
feedMap(x => 2*x, 0) = «0 ‹x› 2*x ‹x› 2*x ‹x› 2*x ...»
```

`feedMap(f, first)` is a generator that applies `f` to its *next parameter*.

* The first time, `feedMap(f, first).next().value ~~ f(first)`
* For any successive call `feedMap(f, first).next(n).value ~~ f(n)`
* `feedMap(f, first)` never returns.

`feedMap` is a convenient generator to pass to `feed` and `feedback`.

```typescript
function feedMap<T, TNext = T> (f: (_: TNext) => T, first: TNext): Generator<T, never, TNext>
```

**Example**

`feeder.next(x => 2 * x, 0)`, when passing increasing numbers from 1 to n, generates numbers `0, 2, 4, 6, 8, ...

### filter

```typescript
filter(x => x % 2)(«1, 2, 3, 4, 5, 6, 7, 8, 9|'A'») = «1, 3, 5, 7, 9|'A'»
```

`filter(p)` takes a generator `g` and generates items `e` of `g` such that `p(e, i) === true`, with `i` the index of `e` on `g`.

`p` is passed each item and the index of the item.

`filter(p)(g)` returns the same value as `g` regardless of whether it passes `p`.

```typescript
function filter<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

### find

```typescript
find(x => x % 10 = 0)(«1, 2, 3, 4, 5, 6, 7, 8, 20, 10, 30») = 20
```

`find(p)(g)` finds the item in `g` that fulfils `p` (if none does, returns `null`)

`p` is passed each item, the index of the item and the `next` value used to get it.

```typescript
function find<T, TNext> (p: (_0: T, _1: number, _2: TNext) => boolean): (g: Generator<T, any, TNext>) => T | null
```

**Example**

`find(x => x%5 === 4)(range(0, 5))` returns 4

### flatMap

```typescript
flatMap(x => «x, x*2 | `end ${x}`»)(«1, 2, 3, 4 | 'A'») = «1, 2, 2, 4, 3, 6, 4, 8 | ['A', 'end 1', 'end 2', 'end 3', 'end 4']»
```
 
`flatMap(f)(g)` takes a generator `g` and applies to each of its items `e`, the function `f`. The result, `f(e)` is another generator. `flatMap` flattens the resulting generator.

All the returning values of the generators created by `g` are put into a list and returned by `flatMap(f)(g)`, preceded by the return value of `f` itself.

```typescript
function flatMap<T, U, TReturn = any, UReturn = any, TNext = any> (f: (_: T, _1: number) => Generator<U, UReturn, TNext>): (g: Generator<T, TReturn, TNext>) => Generator<U, UReturn, TNext>
```

**Example**

`flatMap(x => range(0, x))(fromArray([3, 2, 6]))`, generates `0, 1, 2, 0, 1, 0, 1, 2, 3, 4, 5`

`flatMap((x, i) => returning(i)(range(0, x)))(fromArray([3, 2, 6]))`, returns `[undefined, 0, 1, 2]`

### fromArray

```typescript
fromArray([1, 2, 3, 4], 'A') = «1, 2, 3, 4 | 'A'»
```

`fromArray` takes an array `array` generates, one by one, the elements in `array`.

Optionally `fromArray(array, value)` returns `value`

```typescript
function fromArrayfromArray<T, TReturn = any>(array: T[], returnValue?: TReturn): Generator<T, TReturn, void>
```

### last

```typescript
last(3)(«1, 2, 3, 4 | 'A'») = «[1], [1, 2], [1, 2, 3], [2, 3, 4] | 'A'»
```

`last(size)(g)` generates arrays of `size` elements with the last elements generated of `g` (generating always one more). It returns the same as `g`.

```typescript
function last<T, TReturn = any, TNext = any> (size: number = 1): (g: Generator<T, TReturn, TNext>) => Generator<T[], TReturn, TNext>
```

**Example**

`last(3)(range())` generates [0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], ...

### multicastFromNow

`multicastFromNow(g)` generates independent copies of g.

`g` is required to not have a type of `next`

The return value of each copy is the same as that of the original generator `g` (but does not replay all previous items generated by `g`).

`multicastFromNow(g)` never returns.

### map

```typescript
map(x => x * 2)(«1, 2, 3, 4 | 'A'») = «2, 4, 6, 8 | 'A'»
```

`map(f)(g)` generates items `f(e, i, n)` where `e` are items of `g`, `i` is the index of `e` in `g` and `n` is the `next` passed to get `e`.

`map(f)(g)` returns the same value as `g`.

```typescript
function map<T, U, TReturn = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => U): (g: Generator<T, TReturn, TNext>) => Generator<U, TReturn, TNext>
```

### mergeAll

```typescript
clock           0   1   2   3   4   5   6   7   8   9
g              «a   b           e           h   i | y»
h              «        c   d       f   g | x»
mergeAll(g,h)  «a   b   c   d   e   f   g   h   i | [x, y]»
```

`mergeAll(g1, g2, ...)` generates the items of gi,... as they are generated by the generators. It returns the array of values returned by the generators in the order they end.

```typescript
async function* mergeAll<T, TReturn = any, TNext = any> (...gs: AsyncGenerator<T, TReturn, TNext>[]): AsyncGenerator<T, TReturn, TNext> {
```

### mergeRace

```typescript
clock           0   1   2   3   4   5   6   7   8   9
g              «a   b           e           h   i | y»
h              «        c   d       f   g | x»
mergeRace(g,h) «a   b   c   d   e   f   g | x»
```

`mergeRace(g1, g2, ...)` generates the items of gi,... as they are generated by the generators. It returns the first value returned by any of them.

```typescript
async function* mergeRace<T, TReturn = any, TNext = any> (...gs: AsyncGenerator<T, TReturn, TNext>[]): AsyncGenerator<T, TReturn, TNext> {
```

### multicast

```typescript
multicast(«1, 2, 3 | 'A'») = ««1, 2, 3 | 'A'», «1, 2, 3 | 'A'», «1, 2, 3 | 'A'», ...»
```

`multicast(g)` generates independent copies of g.

`g` is required to not have a type of `next`

The return value of each copy is the same as that of the original generator `g`.

`multicast(g)` never returns.

```typescript
function* multicast<T, TReturn = any> (g: Generator<T, TReturn>): Generator<Generator<T, TReturn>, never>
```

**Example**

If `[c1, c2] = [...take(2)(multicast(2)(range()))]`, then we can consume all elements of c1 (thus consuming g) without consuming the elements of c2.

### multicastFromNow

`multicastFromNow(g)` generates independent copies of g.

`g` is required to not have a type of `next`

The return value of each copy is the same as that of the original generator `g` (but does not replay all previous items generated by `g`).

`multicastFromNow(g)` never returns.

```typescript
function* multicastFromNow<T, TReturn = any> (g: Generator<T, TReturn>): Generator<Generator<T, TReturn>, never>
```

### fromStartMulticast

`fromStartMulticast(g)` generates independent copies of g.

`g` is required to not have a type of `next`

The return value of each copy is the same as that of the original generator `g` (and replays all items generated by `g`).

`fromStartMulticast(g)` never returns.

```typescript
function* fromStartMulticast<T, TReturn = any> (g: Generator<T, TReturn>): Generator<Generator<T, TReturn>, never>
```

### pick

```typescript
pick([3, 1, 5, 1], 'A')(«0, 10, 20, 30, 40 | 'B'») = «30, 10, undefined, 10| 'A'»
```

The `i`-th element of `pick(indexes)(g)` is the `j`-th item of `g` (potentially `undefined`, if `g` does not have `j` items), where `j` is the `i`-th item in `indexes`

`pick(indexes)(g)` passes down to `g` the `next` value passed to `pick` for each `i` in `indexes`, which does not correspond to the items generated by `g`.

`pick(indexes)(g)` returns the returning value of `g` if it finished.

`pick(indexes, returnValue)(g)` returns `returnValue` when either `indexes` or `g` end.

```typescript
function pick<T, TReturn = any, TNext = any> (indexes: number[], returnValue?: TReturn): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

### pipe

```typescript
pipe(f, g, h)(«1, 2, 3 | 'A'») = h(g(f(«1, 2, 3 | 'A'»)))
```

`pipe(...c)(g)` generates items of `g` and passes them through the generator constructors `c_i`

```typescript
function pipe<T>(...constructors: ((_: Generator<T>) => Generator<T>)[]): (generator: Generator<T>) => Generator<T>
```

**Example**

`pipe(drop(5), take(10), filter(x => x % 2 === 0))(range())` generates 6, 8, 10, 12, 14

### prepend

```typescript
preppend(«1, 2, 3 | 'A'»)(«4, 5, 6 | 'B'») = «1, 2, 3, 4, 5, 6 | 'B'»
```

`prepend(g1)(g2)` generates, first, all items from `g1`, and then all items from `g2`

`next` values passed to `prepend(g1)(g2)` are passed down to `g1`, first, and `g2`, after.

The return value of `g1` is ignored. The return value of `prepend(g1)(g2)` is that of `g2`.

```typescript
function prepend<T, TReturn = any, TNext = any> (object: Generator<T, TReturn, TNext>): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

**Example**

`prepend(range(0, 5))(range(5))` generates `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...`

### range

```typescript
range(0, 10, 2, 'A') = «0, 2, 4, 6, 8 | 'A'»
```

`range(start?, end?, step?, returnValue?)` generates numbers from `start` (included) to `end` (excluded) distanced a `step`, either increasing or decreasing

If given a `returnValue`, `range` returns it when it reaches the end.

```typescript
function* range<TReturn = number>(start: number = 0, end: number = Infinity, step: number = 1, vReturn?: TReturn): Generator<number, TReturn, any>
```

**Examples**

* `range()` generates `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`...
* `range(1, 10)` generates `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`
* `range(10, 1, 2)` generates `10`, `8`, `6`, `4`, `2`
* `range(10, 1, 2, 100)` generates `10`, `8`, `6`, `4`, `2` and returns `100`

### reduce

```typescript
reduce((a, b) => a + b, 0)(«1, 2, 3, 4 | 'A'») = «0, 1, 3, 6, 10 | 'A'»
```

`reduce(f, dflt)(g)` generates items `r[i] = f(r[i-1], e)`, and `r[0] = d` and returns the return value of `g`

```typescript
function reduce<T, U = T, TReturn = any, TNext = any> (f: (_0: U, _1: T, _2: number, _3: TNext) => U, u: U): (g: Generator<T, TReturn, TNext>): Generator<U, TReturn, TNext>
```

**Example**

`reduce((acc, x) => acc + x, 0)(range(0, 5))` generates 0, 1, 3, 6, 10

### returning

```typescript
returning('A')(«1, 2, 3 | 'B'») = «1, 2, 3 | 'A'»
```

`returning(value)(g)` generates the same as `g`, and when `g` ends, returns `value`

```typescript
function returning<T, TReturn=any, TNext=any> (returnValue: TReturn): (g: Generator<T, any, TNext>) => Generator<T, TReturn, TNext>
```

### returningMap

```typescript
returningMap(x => `map ${x}`)(«1, 2, 3 | 'A'») = «1, 2, 3 | 'map A'»
```

`returningMap(f)(g)` generates the same as `g`, and when `g` returns `value`, `returningMap(f)(g)` returns `f(value, i, next)` (with `i` the length of `g` and `next` the value used to generate it)

```typescript
function returningMap<T, TReturn=any, UReturn = TReturn, TNext=any> (returnMap: (_: TReturn, _1: number, _2: TNext) => UReturn) (g: Generator<T, any, TNext>) => Generator<T, TReturn, TNext>
```

### sequence

```typescript
sequence ((a, b) => a + b, 1, 1) = «1, 1, 2, 3, 5, 8, 13 ...»
```

`sequence(f, ...initialValues)` generates, first, the initial values and, after, the values produced by the function f over the last values generated

```typescript
function* sequence<T> (f: (..._: T[]) => T, ...initialValues: T[])
```

**Example**

`sequence((a, b) => a + b, 1, 1)` generates the fibonacci sequence

### slice

```typescript
slice(2, 11, 2, 'B')(«0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 'A'») = «2, 4, 6, 8, 10 | 'B'»
```

`slice(start, end, step)(g)` gets items indexed `i` on `g`, where 0 <= `start` <= `i` < `end`, and if `i` is an index, the next index is `i + step`.

```typescript
function slice<T, TReturn = any, TNext = any> (start: number = 0, end: number = Infinity, step: number = 1, returnValue?: TReturn): (_: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

**Example**

* `slice(5, 10)(range())` generates 5, 6, 7, 8, 9
* `slice(5, 10, 2)(range())` generates 5, 7, 9

### some

```typescript
some(x => x % 2 !== 1)(«1, 3, 5, 6, 7, 8») = «false, false, false, true | 6»
```

`some(p)(g)` generates false until an element of `g` satisfies a predicate, in which case it generates true.

It returns the value that fulfilled `p`, if some did, or the value that returns `g`.

`some` does not apply `p` to the return value of `g`.

```typescript
function some<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean): (g: Generator<T, TReturn, TNext>) => Generator<boolean, T | null, TNext>
```

### sortInsert

```typescript
sortInsert(3)(«1, 2, 4, 5 | 'A'») = «1, 2, 3, 4, 5 | 'A'»
```

If `g` is a sorted generator (according to `sort`), then `sortInsert(item, sort)(g)` generates the items of `g` including `item` following order given by `sort`.

`sortInsert(item, sort)(g)` provides to `g` consecutive `next` values, irrespective of the insertion of the item.

```typescript
function sortInsert<T, TReturn = any, TNext = any> (item: T, sort: (_0: T, _1: T) => number): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

**Example**

`sortInsert(5, (a, b) => a - b)(range(0, 10, 2))` generates 0, 2, 4, 5, 6, 8

### sortMerge

```typescript
sortMerge(«0, 2, 4 | 'B'»)(«1, 3, 5 | 'A'») = «0, 1, 2, 3, 4, 5 | ['A', 'B']»
```

If `g` and `h` are sorted generators (according to `sort`), then `sortMerge(h, sort)(g)` generates the items of `g` and `h` following order given by `sort`.

`sortMerge(h, sort)(g)` returns `[v, w]` if `g` returns `v` and `h` returns `w`.

```typescript
function sortMerge<T, TReturn = any, TNext = any> (h: Generator<T, TReturn, TNext>, sort: (_0: T, _1: T) => number): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn[], TNext>
```

**Example**

`sortMerge(range(0, 10, 2), (a, b) => a - b)(range(1, 11, 2))` gives 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

### step

```typescript
step(2, 'A')(«0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | 'B'») = «0, 2, 4, 6, 8 | 'A'» 
```

`step(distance)(g)` gets the elements of `g` separated `distance` items between each.

`step(distance, returnValue)(g)` returns `returnValue` if specified. Otherwise, it returns the returned value of `g`.

```typescript
function step<T, TReturn = any, TNext = any> (distance: number = 1, returnValue?: TReturn): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

**Example**

`step(5)(range())` generates 0, 5, 10, 15...

### tagFeed

```typescript
tagFeed(«1, 2, 3, 4, 5 | 'A'») = «[1, undefined] ‹x› [2, x] ‹x› [3, x] ‹x› [4, x] ‹x› [5, x] ‹x› | ['A', x]»
```
 
`tagFeed(g)` generates `[e, n]`, where `e` is an item generated by `g` and `n` is the next value passed to generate `e`.

`tagFeed(g)` returns `[r, n]`, where `r` is the return value of `r` and `n` is the next value passed to end `g`.

```typescript
function* tagFeed<T, TReturn = any, TNext = T>(g: Generator<T, TReturn, TNext>): Generator<(T | TNext)[], (TReturn | TNext)[], TNext>
```

**Example**

`feed(range(0, 5))(tagFeed(feedMap(x => x * 2, 0)))` generates `[ 0, undefined ]`, `[ 0, 0 ]`, `[ 2, 1 ]`, `[ 4, 2 ]`, `[ 6, 3 ]`, `[ 8, 4 ]`.

### take

```typescript
take(3, 'A')(«1, 2, 3, 4, 5 | 'B'») = «1, 2, 3| 'A'»
```

`take(n)` takes a generator `g` and generates its first `n` (default `n` = 1) items.

If `g` runs out before reaching `n` elements, `take(n, value)(g)` returns the return value of `g`. Otherwise, it returns `value`.

```typescript
function take<T, TReturn = any, TNext = any> (n: number = 1, returnValue?: TReturn): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn | null, TNext>
```

### takeWhile

```typescript
takeWhile(x => x < 4, 'A')(«1, 2, 3, 4, 5 | 'B'») = «1, 2, 3| 'A'»
```

`takeWhile(p)(g)` generates items `e` of `g` as long `p(e, index, next)` holds (`index` is the index of `e` in `g` and `next` is the next value used to generate it)

If `g` finishes before finsing the item that fulfils `p`, `takeWhile(p, v)(g)` returns `v`

```typescript
function takeWhile<T, TReturn = any, TNext = any> (p: (_0: T, _1: number, _2: TNext) => boolean, returnValue?: TReturn): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

### tap

```typescript
tap(console.log)(«1, 2, 3, 4 | 'A'») = «1, 2, 3, 4 | 'A'» // prints `1`, `2`, `3`, `4`
```
 
`tap(f)(g)` applies `f(e)` where `e` are items of `g`, and generates `e` unchanged

```typescript
function tap<T, TReturn = any, TNext = any> (f: (_0: T, _1: number, _2: TNext) => any): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>
```

### throttle

```typescript
clock           0   1   2   3   4   5   6   7   8   9
g              «A           B   C       D         |'A'»
throttle(2)(g) «A           B           D         |'A'»
```

`throttle(ms)(g)` throttles the items of `g` `ms` milliseconds. This means that when `g` generates an item `e`, `throttle(ms)(g)` generates the same item and sets a timeout of `ms` milliseconds; any item `g` generates during that time is ignored.

`throttle` returns the same as `g`.

### toArray

```typescript
toArray(«1, 2 | 'A'») = [1, 2]
```

`toArray(g)` generates all values of `g` and collects them into an array. It ignores the return of `g`.

```typescript
function toArray<T, TReturn = any, TNext = any> (g: Generator<T, TReturn, TNext>): T[]
```

### toAsync

```typescript
toAsync(«1, 2 | 'A'») = [Promise.resolve(1), Promise.resolve(2) | 'A']
```

`toAsync(g)` takes a synchronous generators and generates its items asynchronously. It returns the same value as `g`.

```typescript
async function* toAsync<T, TReturn = any, TNext = any> (g: Generator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext>
```


### transposeAll

```typescript
transposeAll(«1, 2, 3 | 'A'», «40, 50 | 'B'», «0.6, 0.7, 0.8|'C'») = «[1, 40, 0.6], [2, 50, 0.7], [3, undefined, 0.8] | ['A', 'B', 'C']»
```

`transposeAll(g1, ..., gn)` generates items `[e1, ..., en]` where `ei` is an item of `gi` (generated with the same `next` value) until the last one of them finishes

When one generator `gi` finishes and returns a value, `transposeAll(g1, ..., gn)` does not include this value in its yield. Instead, yields an `undefined` in location `i`.

When all the generators finish, `transposeAll(g1, ..., gn)` returns an array with all its return values.

```typescript
function* mixAllmixAll<T, TReturn = any, TNext = any> (...gs: Generator<T, TReturn, TNext>[]): Generator<T[], TReturn[], TNext>
```

**Example**

* `transposeAll (fromArray(['a', 'b', 'c'], 'd'), range(0, 4, 1, 100))` generates `['a', 0]`, `['b', 1]`, `['c', 2]`, `[undefined, 3]`, and returns `['d', 100]`

### transposeRace

```typescript
transposeRace(«1, 2, 3 | 'A'», «40, 50 | 'B'», «0.6, 0.7, 0.8|'C'») = «[1, 40, 0.6], [2, 50, 0.7] | ['Final', undefined, 'B', undefined]»
```

`transposeRace(g1, ..., gn)` generates items `[e1, ..., en]` where `ei` is an item of `gi` (generated with the same `next` value) until the first one of them finishes

When one or more generators `gi` return `vi`, `transposeRace(g1, ..., gn)` returns an array with `vi` in positions `i`, and `undefined` everywhere else

```typescript
function* transposeRace<T, TReturn = any, TNext = any> (...gs: Generator<T, TReturn, TNext>[]): Generator<T, TReturn[], TNext> {
```

**Example**

* `transposeRace (fromArray(['a', 'b', 'c'], 200), range(0, 4, 1, 100))` generates `['a', 0]`, `['b', 1]`, `['c', 2]` and returns `[200, undefined]`

### yieldReturnValue

```typescript
yieldReturnValue(«1, 2, 3 | 'A'») = «1, 2, 3, 'A' | 'A'»
```

`yieldReturnValue(g)` generates the same values as g, but at also yields the return value of `g`.

```typescript
function* yieldReturnValue<T, TReturn=any, TNext=any> (g: Generator<T, TReturn, TNext>): Generator<T, TReturn, TNext>
```

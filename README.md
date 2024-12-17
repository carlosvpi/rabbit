<div align="center">

![logo](https://github.com/carlosvpi/rabbit/blob/main/docs/assets/Rabbit.svg?raw=true)

_Generator utilities_

# Rabbit

Utility javascript library for generators and asynchronous generators

[Documentation](https://github.com/carlosvpi/rabbit/blob/main/docs/documentation.md)

</div>

@carlosvpi/rabbit provides a large number of operators to work with generators (both synchronous and asynchronous), extending the native set of generator methods.

It provides useful `pipe` operator to apply as many transformations as needed to your generators.

For example, it can compute the variance of Math.random()

```typescript
toArray(                            
  pipe(
    last(2),                        // get, together with an item, the previous one
    drop(1),                        // ignore the first item
    map(([a, b]) => (a - b)**2),    // compute the square of the difference
    reduce((a, b) => a + b, 0),     // compute the sum
    take(100),                      // take 100 items
  )(sequence(() => Math.random()))  // produce random numbers
).at(-1)
```

It can also mimic reactive programming by the use of `multicast` 

```typescript
const clicks = fromEvent(button, 'click')   // clicks emits each click
const multicasted = multicastAsync(clicks)  // multicast clicks

// One part of the app counts the clicks
const count = map((_, i) => i)(multicasted.next())

// Another part of the app fetches a url on every click
const data = asyncPipe(
  throttle(300),                          // Throttles the events 300ms 
  tap(setLoader),                         // set up a loader
  asyncMap(() => fetch('url')),           // retrieve a response
  asyncMap(response => response.json())   // retrieve data (this is the result of the generator)
  tap(removeLoader),                      // remove the loader
  asyncTryCatch(recovery)                 // recover from errors
)(multicasted.next())                     // get a view on `clicks`
```

## Install

Install @carlosvpi/rabbit:

```bash
npm install @carlosvpi/rabbit
```

or

```bash
yarn add @carlosvpi/rabbit
```

Importing:

```typescript
import { take } from '@carlosvpi/rabbit'
```

@carlosvpi/rabbit is ready to be tree-shaken. Make sure `tsconfig.json` contains in `compilerOptions` the following:

```json
  "module": "node16",
  "moduleResolution": "node16"
```

Then you can import rabbit's methods like so:

```typescript
import { take } from '@carlosvpi/rabbit/take'
```

## Example

This gives us the fibonacci sequence

```typescript
sequence((a, b) => a + b, 1, 1)

=> 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... // inifinte sequence
```

As is, the sequence is inifinite, so let's take only the 10 first items

```typescript
[...take(10)(sequence((a, b) => a + b, 1, 1))]

=> [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

Now let's group them in tuples of 2 consecutive items

```typescript
[...runningTuples(2)(take(10)(sequence((a, b) => a + b, 1, 1)))]

=> [
  [ 1, 1 ], [ 1, 2 ],
  [ 2, 3 ], [ 3, 5 ],
  [ 5, 8 ], [ 8, 13 ],
  [ 13, 21 ], [ 21, 34 ],
  [ 34, 55 ]
]
```

That is a bit cumbersome to write. We can do the same `pipe`:

```typescript
[...pipe(
  take(10),
  runningTuples(2)
)(sequence((a, b) => a + b, 1, 1))]

=> [
  [ 1, 1 ], [ 1, 2 ],
  [ 2, 3 ], [ 3, 5 ],
  [ 5, 8 ], [ 8, 13 ],
  [ 13, 21 ], [ 21, 34 ],
  [ 34, 55 ]
]
```

Let's divide the items in the tuples to find the ratio of each two consecutive elements in the sequence
```typescript
[...pipe(
  take(10),
  runningTuples(2),
  map(([a, b]) => b / a)
)(sequence((a, b) => a + b, 1, 1))]

=> [
  1,
  2,
  1.5,
  1.6666666666666667,
  1.6,
  1.625,
  1.6153846153846154,
  1.619047619047619,
  1.6176470588235294
]
```

Now we can approximate the golden ratio picking the `n`-th (for a large `n`) pair in the sequence
```typescript
[...pipe(
  slice(1000, 1002),
  runningTuples(2),
  map(([a, b]) => b / a)
)(sequence((a, b) => a + b, 1, 1))]

=> [1.618033988749895]
```
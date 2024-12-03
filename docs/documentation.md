## Functions

### feed
### feedback
### filter

```typescript
function filter<T> (p: (_0: T, _1: number) => boolean): (g: Generator<T>) => Generator<T> {
```

`filter(p)` takes a generator `g` and generates items `e` of `g` such that `p(e, i) === true`, with `i` the index of `e` on `g`.

### fromArray

```typescript
function fromArray<N>(array: N[]): Generator<N>
```

`fromArray` takes an array `array` generates, one by one, the elements in `array`.

### head

```typescript
function head<T> (n: number): (g: Generator<T>) => Generator<T>
```

`head(n)` takes a generator `g` and generates its first `n` (default `n` = 1) items.

### headWhile

```typescript
function headWhile<T> (p: (_0: T, _1: number) => boolean): (g: Generator<T>) => Generator<T>
```

`headWhile(p)` takes a generator `g` and generates its items from the first onwards while each item `e` fulfill `p(e, i)`, with `i` the index of `e` on `g`.

### map

```typescript
function map<T, U> (f: (_0: T, _1: number) => U): (g: Generator<T>) => Generator<T>
```

`map(f)` takes a generator `g` and generates for each `e` of `g`, the value `f(e, i)`, with `i` the index of `e` on `g`.

### pick

```typescript
function pick<T> (indexes: number[]): (g: Generator<T>) => Generator<T> { 
```


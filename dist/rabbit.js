(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rabbit = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./src/aggregateAll"), exports);
__exportStar(require("./src/aggregateRace"), exports);
__exportStar(require("./src/append"), exports);
__exportStar(require("./src/awaitCall"), exports);
__exportStar(require("./src/awaitEvent"), exports);
__exportStar(require("./src/awaitInterval"), exports);
__exportStar(require("./src/awaitPromise"), exports);
__exportStar(require("./src/chunks"), exports);
__exportStar(require("./src/debounce"), exports);
__exportStar(require("./src/drop"), exports);
__exportStar(require("./src/dropWhile"), exports);
__exportStar(require("./src/every"), exports);
__exportStar(require("./src/feed"), exports);
__exportStar(require("./src/feedback"), exports);
__exportStar(require("./src/feedMap"), exports);
__exportStar(require("./src/filter"), exports);
__exportStar(require("./src/find"), exports);
__exportStar(require("./src/flatMap"), exports);
__exportStar(require("./src/fromArray"), exports);
__exportStar(require("./src/multicastFromNow"), exports);
__exportStar(require("./src/last"), exports);
__exportStar(require("./src/map"), exports);
__exportStar(require("./src/mergeAll"), exports);
__exportStar(require("./src/mergeRace"), exports);
__exportStar(require("./src/multicast"), exports);
__exportStar(require("./src/changesOnly"), exports);
__exportStar(require("./src/pick"), exports);
__exportStar(require("./src/pipe"), exports);
__exportStar(require("./src/prepend"), exports);
__exportStar(require("./src/range"), exports);
__exportStar(require("./src/reduce"), exports);
__exportStar(require("./src/multicastFromStart"), exports);
__exportStar(require("./src/returning"), exports);
__exportStar(require("./src/returningMap"), exports);
__exportStar(require("./src/returns"), exports);
__exportStar(require("./src/sequence"), exports);
__exportStar(require("./src/slice"), exports);
__exportStar(require("./src/some"), exports);
__exportStar(require("./src/sortInsert"), exports);
__exportStar(require("./src/sortMerge"), exports);
__exportStar(require("./src/step"), exports);
__exportStar(require("./src/tagFeed"), exports);
__exportStar(require("./src/take"), exports);
__exportStar(require("./src/takeWhile"), exports);
__exportStar(require("./src/tap"), exports);
__exportStar(require("./src/throttle"), exports);
__exportStar(require("./src/toArray"), exports);
__exportStar(require("./src/toAsync"), exports);
__exportStar(require("./src/transposeAll"), exports);
__exportStar(require("./src/transposeRace"), exports);
__exportStar(require("./src/tryCatch"), exports);
__exportStar(require("./src/types"), exports);
__exportStar(require("./src/yieldReturnValue"), exports);

},{"./src/aggregateAll":2,"./src/aggregateRace":3,"./src/append":4,"./src/awaitCall":5,"./src/awaitEvent":6,"./src/awaitInterval":7,"./src/awaitPromise":8,"./src/changesOnly":9,"./src/chunks":10,"./src/debounce":11,"./src/drop":12,"./src/dropWhile":13,"./src/every":14,"./src/feed":15,"./src/feedMap":16,"./src/feedback":17,"./src/filter":18,"./src/find":19,"./src/flatMap":20,"./src/fromArray":21,"./src/last":22,"./src/map":23,"./src/mergeAll":24,"./src/mergeRace":25,"./src/multicast":26,"./src/multicastFromNow":27,"./src/multicastFromStart":28,"./src/pick":29,"./src/pipe":30,"./src/prepend":31,"./src/range":32,"./src/reduce":33,"./src/returning":34,"./src/returningMap":35,"./src/returns":36,"./src/sequence":37,"./src/slice":38,"./src/some":39,"./src/sortInsert":40,"./src/sortMerge":41,"./src/step":42,"./src/tagFeed":43,"./src/take":44,"./src/takeWhile":45,"./src/tap":46,"./src/throttle":47,"./src/toArray":48,"./src/toAsync":49,"./src/transposeAll":50,"./src/transposeRace":51,"./src/tryCatch":52,"./src/types":53,"./src/yieldReturnValue":54}],2:[function(require,module,exports){
"use strict";
/**
 *
 * Combines multiple asynchronous generators into a single generator.
 *
 * Yields the list of the latest values from each generator every time any generator yields.
 *
 * Returns the list of return values of each generator when all have returned.
 *
 * @example
 * ```typescript
 * clock              0   1   2   3   4   5   6   7   8   9
 * a                 «a   b           e           h   i | y»
 * b                 «        c   d       f   g | x»
 * aggregateAll      «a-  b-  bc  bd  ed  ef  eg| hg  ig| xy»
 * ```
 * @see aggregateRace
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param gs Array of asynchronous generators
 * @returns aggregated generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateAll = aggregateAll;
async function* aggregateAll(...gs) {
    const results = [];
    const stored = [];
    stored.push = stored.push.bind(stored);
    let next;
    let values = [];
    let freeLocks = gs.map(() => () => { });
    let remainingGenerators = gs.length;
    let resolver;
    gs.forEach(async (g, i) => {
        let iterator;
        while (!(iterator = await g.next(next)).done) {
            freeLocks[i](next);
            values = [...values];
            values[i] = iterator.value;
            resolver({ value: values, done: false });
            resolver = stored.push;
            await new Promise(resolve => freeLocks[i] = resolve);
        }
        results[i] = iterator.value;
        if (--remainingGenerators)
            return;
        resolver({ value: results, done: true });
        resolver = stored.push;
    });
    let iterator;
    while (!(iterator = await new Promise(resolve => {
        if (stored.length) {
            resolve(stored.splice(0, 1)[0]);
        }
        else {
            resolver = resolve;
        }
    })).done) {
        next = yield iterator.value;
        freeLocks.forEach(freeLock => freeLock(next));
    }
    return iterator.value;
}

},{}],3:[function(require,module,exports){
"use strict";
/**
 *
 * Combines multiple asynchronous generators into a single generator.
 *
 * Yields the list of the latest values from each generator every time any generator yields.
 *
 * Returns the value returned by the first generator that returns.
 *
 * @example
 * ```typescript
 * clock              0   1   2   3   4   5   6   7   8   9
 * a                 «a   b           e           h   i | y»
 * b                 «        c   d       f   g | x»
 * aggregateAll      «a-  b-  bc  bd  ed  ef  eg| x»
 * ```
 * @see aggregateAll
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param gs Array of asynchronous generators
 * @returns aggregated generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateRace = aggregateRace;
async function* aggregateRace(...gs) {
    const stored = [];
    stored.push = stored.push.bind(stored);
    let next;
    let values = [];
    let freeLocks = gs.map(() => () => { });
    let resolver;
    gs.forEach(async (g, i) => {
        let iterator;
        while (!(iterator = await g.next(next)).done) {
            freeLocks[i](next);
            values = [...values];
            values[i] = iterator.value;
            resolver({ value: values, done: false });
            resolver = stored.push;
            await new Promise(resolve => freeLocks[i] = resolve);
        }
        resolver({ value: iterator.value, done: true });
    });
    let iterator;
    while (!(iterator = await new Promise(resolve => {
        if (stored.length) {
            resolve(stored.splice(0, 1)[0]);
        }
        else {
            resolver = resolve;
        }
    })).done) {
        next = yield iterator.value;
        freeLocks.forEach(freeLock => freeLock(next));
    }
    return iterator.value;
}

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.append = append;
function asyncAppend(object) {
    return async function* (g) {
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            next = yield iterator.value;
        }
        while (!(iterator = await object.next(next)).done) {
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function syncAppend(object) {
    return function* (g) {
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            next = yield iterator.value;
        }
        while (!(iterator = object.next(next)).done) {
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function append(object) {
    return object[Symbol.asyncIterator]
        ? asyncAppend(object)
        : syncAppend(object);
}

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitCall = awaitCall;
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
function awaitCall(caller) {
    let next;
    let returnValue;
    let iterate = true;
    let resolver;
    let lastPush = [];
    let items = [];
    const g = (async function* () {
        while (iterate) {
            const item = await new Promise(resolve => {
                if (items.length) {
                    resolve(items.splice(0, 1)[0]);
                    return;
                }
                resolver = resolve;
            });
            if (lastPush.length)
                lastPush.splice(0, 1)[0](next = yield item);
        }
        while (items.length) {
            lastPush.splice(0, 1)[0](next = yield items.splice(0, 1)[0]);
        }
        return returnValue;
    })();
    caller([
        g,
        (value) => {
            if (!iterate)
                return Promise.resolve(null);
            items.push(value);
            if (resolver) {
                resolver(items.splice(0, 1)[0]);
                resolver = null;
            }
            return new Promise(resolve => lastPush.push((v) => resolve(v)));
        },
        (result) => {
            iterate = false;
            returnValue = result;
            if (resolver)
                resolver(result);
        }
    ]);
    return g;
}

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitEvent = awaitEvent;
/**
 * `awaitEvent(target, eventName, options, checkStop)` adds an eventListener to the `target` and every time the event fires it is generated asynchronously by `awaitEvent`.
 *
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 *
 * Emits every click event until the 10th one, when it returns `'end'`
 *
 * @example
 * ```typescript
 * awaitEvent(button, 'click', {}, (stop, _, i) => i === 10 && stop('end')))
 * ```
 *
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param target The target element to listen to
 * @param eventName The name of the event
 * @param options Options for addEventListener
 * @param checkStop Function called on every item to check if the listener should be removed
 * @returns the asynchronous generator
 */
async function* awaitEvent(target, eventName, options = {}, checkStop = () => { }) {
    let next;
    let i = 0;
    let iterator;
    let items = [];
    let isPromiseFree = true;
    let f;
    let currentEach;
    const stop = (result) => {
        var _a;
        if ((_a = items.at(-1)) === null || _a === void 0 ? void 0 : _a.done)
            return;
        items.push({ value: result, done: true });
    };
    const handler = (value) => {
        var _a;
        if (!((_a = items.at(-1)) === null || _a === void 0 ? void 0 : _a.done)) {
            items.push({ value, done: false });
        }
        if (isPromiseFree) {
            f(items.splice(0, 1)[0]);
            isPromiseFree = false;
        }
        currentEach === null || currentEach === void 0 ? void 0 : currentEach(value, i++);
    };
    target.addEventListener(eventName, handler, options);
    checkStop(stop, (each) => { currentEach = each; });
    while (!(iterator = await new Promise(r => {
        if (items.length) {
            r(items.splice(0, 1)[0]);
        }
        else {
            f = r;
            isPromiseFree = true;
        }
    })).done) {
        next = yield Promise.resolve(iterator.value);
    }
    target.removeEventListener(eventName, handler);
    return iterator.value;
}

},{}],7:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitInterval = awaitInterval;
async function* awaitInterval(ms, checkStop = () => { }) {
    let next;
    let i = 0;
    let returnValue;
    let iterate = true;
    let item;
    let f;
    let currentEach;
    const stop = (result) => {
        iterate = false;
        returnValue = result;
    };
    const token = setInterval(() => {
        const now = Date.now();
        f(now, i++, next);
        currentEach === null || currentEach === void 0 ? void 0 : currentEach(now, i);
    }, ms);
    checkStop(stop, (each) => { currentEach = each; });
    while (iterate) {
        next = yield item = await new Promise(r => {
            f = r;
        });
    }
    clearInterval(token);
    return returnValue;
}

},{}],8:[function(require,module,exports){
"use strict";
/**
 *
 * `awaitPromise(promiseFactory, checStop)` emits the result of consecutive calls to the promiseFactory.
 *
 * `promiseFactory` is passed the current index and the `next` value passed to `awaitPromise`.
 *
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 *
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param promiseFactory The factory of promises to await
 * @param checkStop The function called on every emitted event to check whether to continue
 * @returns the asynchronous generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitPromise = awaitPromise;
async function* awaitPromise(promiseFactory, checkStop = () => { }) {
    let next;
    let i = 0;
    let returnValue;
    let iterate = true;
    let currentEach;
    const stop = (result) => {
        iterate = false;
        returnValue = result;
    };
    checkStop(stop, (each) => { currentEach = each; });
    while (iterate) {
        const item = await promiseFactory(i++, next);
        currentEach === null || currentEach === void 0 ? void 0 : currentEach(item, i);
        next = yield item;
    }
    return returnValue;
}

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncChangesOnly = asyncChangesOnly;
exports.syncChangesOnly = syncChangesOnly;
exports.changesOnly = changesOnly;
function asyncChangesOnly(diff) {
    return async function* (g) {
        let next;
        let iterator;
        let last = (iterator = await g.next(next)).value;
        if (iterator.done)
            return iterator.value;
        next = yield last;
        while (!(iterator = await g.next(next)).done) {
            if (diff(last, iterator.value) === 0) {
                continue;
            }
            last = iterator.value;
            next = yield last;
        }
        return iterator.value;
    };
}
function syncChangesOnly(diff) {
    return function* (g) {
        let next;
        let iterator;
        let last = (iterator = g.next(next)).value;
        if (iterator.done)
            return iterator.value;
        next = yield last;
        while (!(iterator = g.next(next)).done) {
            if (diff(last, iterator.value) === 0) {
                continue;
            }
            last = iterator.value;
            next = yield last;
        }
        return iterator.value;
    };
}
/**
 * changesOnly returns a generator that yields a value only if it is different from the last yielded value
 *
 * Example: `changesOnly((a, b) => a - b)(fromArray([1, 1, 2, 1, 3, 3]))` generates 1, 2, 1, 3
 *
 * @param diff a function that returns 0 if the two values are equal, and a non-zero value otherwise
 * @returns
 */
function changesOnly(diff) {
    const asyncFunctor = asyncChangesOnly(diff);
    const syncFunctor = syncChangesOnly(diff);
    return function (g) {
        if (typeof g[Symbol.asyncIterator] === 'function') {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunks = chunks;
function asyncChunks(size = 1) {
    return async function* (g) {
        let iterator;
        let next;
        let tuple = [];
        while (!(iterator = await g.next(next)).done) {
            tuple.push(iterator.value);
            if (tuple.length < size)
                continue;
            next = yield tuple;
            tuple = [];
        }
        if (tuple.length > 0 && tuple.length < size) {
            yield tuple;
        }
        return iterator.value;
    };
}
function syncChunks(size = 1) {
    return function* (g) {
        let iterator;
        let next;
        let tuple = [];
        while (!(iterator = g.next(next)).done) {
            tuple.push(iterator.value);
            if (tuple.length < size)
                continue;
            next = yield tuple;
            tuple = [];
        }
        if (tuple.length > 0 && tuple.length < size) {
            yield tuple;
        }
        return iterator.value;
    };
}
/**
 * Divides a generator in chunks of a given size
 *
 * Returns the same value as the generator
 *
 * @example `chunks(3)(range())` generates [0, 1, 2], [3, 4, 5], [6, 7, 8], ...
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param {number} [size=1] The size of the chunks to generate
 * @returns chunk generator
 */
function chunks(size = 1) {
    const asyncFunctor = asyncChunks(size);
    const syncFunctor = syncChunks(size);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
function debounce(ms) {
    return async function* (g) {
        let next;
        let iterator;
        let promised;
        let p;
        let timeout;
        let timedout;
        p = g.next(next);
        while (!(iterator = await p).done) {
            p = g.next(next);
            timeout = new Promise(r => timedout = r);
            while (promised = await Promise.race([p, new Promise(r => setTimeout(() => { r(); timedout(); }, ms))])) {
                if (promised.done) {
                    await timeout;
                    yield iterator.value;
                    return promised.value;
                }
                iterator = promised;
                timeout = new Promise(r => timedout = r);
                p = g.next(next);
            }
            yield iterator.value;
        }
        return iterator.value;
    };
}

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drop = drop;
function asyncDrop(n = 0, returnValue) {
    return async function* (g) {
        let next;
        let iterator;
        while (n-- > 0 && !(iterator === null || iterator === void 0 ? void 0 : iterator.done)) {
            iterator = await g.next(next);
        }
        if (iterator === null || iterator === void 0 ? void 0 : iterator.done)
            return returnValue !== null && returnValue !== void 0 ? returnValue : iterator === null || iterator === void 0 ? void 0 : iterator.value;
        while (!(iterator = await g.next(next)).done) {
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
function syncDrop(n = 0, returnValue) {
    return function* (g) {
        let next;
        let iterator;
        while (n-- > 0 && !(iterator === null || iterator === void 0 ? void 0 : iterator.done)) {
            iterator = g.next(next);
        }
        if (iterator === null || iterator === void 0 ? void 0 : iterator.done)
            return returnValue !== null && returnValue !== void 0 ? returnValue : iterator === null || iterator === void 0 ? void 0 : iterator.value;
        while (!(iterator = g.next(next)).done) {
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
/**
 * `drop(n)(g)` drops `n` items `e` of `g`. After dropping the items, it generates the same as `g` and returns the same as `g`.
 *
 * If `g` is shorter than `n`, `drop` returns `g`'s return value when it ends.
 *
 * **Example** `drop(5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {number} [n] The amount of items to drop
 */
function drop(n = 0, returnValue) {
    const asyncFunctor = asyncDrop(n, returnValue);
    const syncFunctor = syncDrop(n, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropWhile = dropWhile;
function asyncDropWhile(p, returnValue) {
    return async function* (g) {
        let next;
        let iterator;
        let i = 0;
        while (!(iterator = await g.next(next)).done && p(iterator.value, i++)) { }
        if (iterator.done)
            return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
        next = yield iterator.value;
        while (!(iterator = await g.next(next)).done) {
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
function syncDropWhile(p, returnValue) {
    return function* (g) {
        let next;
        let iterator;
        let i = 0;
        while (!(iterator = g.next(next)).done && p(iterator.value, i++)) { }
        if (iterator.done)
            return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
        next = yield iterator.value;
        while (!(iterator = g.next(next)).done) {
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
/**
 * `dropWhile(p)(g)` drops items `e` of `g` as long `p(e, i)` holds (`i` is the index of `e` in `g`).
 *
 * After dropping the items, it generates the same as `g` and returns either the specified value or, if not specified, the same as `g`.
 *
 * **Example** `dropWhile(x => x % 6 !== 5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {Function} [p] The predicate that is checked against items of `g`
 */
function dropWhile(p, returnValue) {
    const asyncFunctor = asyncDropWhile(p, returnValue);
    const syncFunctor = syncDropWhile(p, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.every = every;
function asyncEvery(p) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        let value = true;
        while (!(iterator = await g.next(next)).done) {
            value && (value = p(iterator.value, i++, next));
            next = yield value;
            if (!value)
                return iterator.value;
        }
        return iterator.value;
    };
}
function syncEvery(p) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        let value = true;
        while (!(iterator = g.next(next)).done) {
            value && (value = p(iterator.value, i++, next));
            next = yield value;
            if (!value)
                return iterator.value;
        }
        return iterator.value;
    };
}
/**
 *
 * `every(p)(g)` generates true until an element of `g` no longer satisfies a predicate, in which case it generates false.
 *
 * It returns the value that did not fulfil `p`, if some, or the value that returns `g`.
 *
 * `every` does not apply `p` to the return value of `g`.
 *
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns
 */
function every(p) {
    const asyncFunctor = asyncEvery(p);
    const syncFunctor = syncEvery(p);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feed = feed;
function asyncFeed(feeder) {
    return async function* (g) {
        let gCursor;
        let feedCursor;
        let next;
        do {
            gCursor = await g.next(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.value);
            if (!gCursor.done)
                next = yield gCursor.value;
            feedCursor = await feeder.next(next);
        } while (!gCursor.done && !(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.done));
        return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null];
    };
}
function syncFeed(feeder) {
    return function* (g) {
        let gCursor;
        let feedCursor;
        let next;
        do {
            gCursor = g.next(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.value);
            if (!gCursor.done)
                next = yield gCursor.value;
            feedCursor = feeder.next(next);
        } while (!gCursor.done && !(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.done));
        return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null];
    };
}
function feed(feeder) {
    const f = feeder[Symbol.asyncIterator]
        ? asyncFeed(feeder)
        : syncFeed(feeder);
    return feeder[Symbol.asyncIterator]
        ? (function (g) {
            return f(g);
        })
        : (function (g) {
            return f(g);
        });
}

},{}],16:[function(require,module,exports){
"use strict";
/**
 * FeedMap creates a generator whose values depend on its *next* parameter.
 *
 * The first call: `feedMap(f, first).next().value` = `f(first)`,
 *
 * The next calls: `feedMap(f, _).next(n).value` = `f(n)`,
 *
 * `feedMap(f, first)` never returns.
 *
 * @param {generator} [f] the function to apply to the *next* parameter
 * @param {generator} [first] the first element to generate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedMap = feedMap;
function* feedMap(f, first) {
    let i = 0;
    let next = yield f(first, i++);
    while (true) {
        next = yield f(next, i++);
    }
}

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback = feedback;
function asyncFeedback(feeder) {
    return async function* (g) {
        let gCursor;
        let feedCursor;
        do {
            gCursor = await g.next(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.value);
            if (!gCursor.done)
                yield gCursor.value;
            feedCursor = await feeder.next(gCursor.value);
        } while (!gCursor.done && !feedCursor.done);
        return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null];
    };
}
function syncFeedback(feeder) {
    return function* (g) {
        let gCursor;
        let feedCursor;
        do {
            gCursor = g.next(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.value);
            if (!gCursor.done)
                yield gCursor.value;
            feedCursor = feeder.next(gCursor.value);
        } while (!gCursor.done && !feedCursor.done);
        return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null];
    };
}
function feedback(feeder) {
    const f = feeder[Symbol.asyncIterator]
        ? asyncFeedback(feeder)
        : syncFeedback(feeder);
    return feeder[Symbol.asyncIterator]
        ? (function (g) {
            return f(g);
        })
        : (function (g) {
            return f(g);
        });
}

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = filter;
function asyncFilter(p) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            if (p(iterator.value, i++, next)) {
                next = yield iterator.value;
            }
        }
        return iterator.value;
    };
}
function syncFilter(p) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            if (p(iterator.value, i++, next)) {
                next = yield iterator.value;
            }
        }
        return iterator.value;
    };
}
/**
 * `filter(p)(g)` generates the items `e` of `g` that pass the predicate `p(e, i)`, where `i` is the index of `e` in `g`.
 *
 * `p` is passed each item and the index of the item.
 *
 * `filter(p)(g)` returns the same value as `g` regardless of whether it passes `p`.
 *
 * **Example** `filter(x => x % 2 === 0)(range(0, 10))` generates 0, 2, 4, 6, 8
 * @param {generator} [p] the filtering predicate
 */
function filter(p) {
    const asyncFunctor = asyncFilter(p);
    const syncFunctor = syncFilter(p);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = find;
function asyncFind(p) {
    return async function (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            if (p(iterator.value, i++, next))
                return iterator.value;
        }
        return null;
    };
}
function syncFind(p) {
    return function (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            if (p(iterator.value, i++, next))
                return iterator.value;
        }
        return null;
    };
}
/**
 * `find(p)(g)` finds the item in `g` that fulfils `p` (if none does, returns `null`)
 *
 * `p` is passed each item, the index of the item and the `next` value used to get it.
 *
 * The return value of `g` is ignored.
 *
 * **Example** `find(x => x % 5 === 4)(range(0, 5))` returns 4
 * @param {function} [p] The predicate that characterizes the solution, or null if no solution is found
 */
function find(p) {
    const asyncFunctor = asyncFind(p);
    const syncFunctor = syncFind(p);
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    }
    return functor;
}

},{}],20:[function(require,module,exports){
"use strict";
/**
 * `flatMap(f)(g)`, where `g` is a generator and `f(e, i)`, for each item `e` of `g` and index `i` of `e`, is another generator, generates (flattening) each value from each `f(e)`.
 *
 * All the returning values of the generators created by `g` are put into a list and returned by `flatMap(f)(g)`, preceded by the return value of `f` itself.
 *
 * @param {generator} [f] the function from item to generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatMap = flatMap;
function flatMap(f) {
    return function (g) {
        const returnValue = [];
        let gIterator;
        let next;
        let i = 0;
        if (g[Symbol.asyncIterator]) {
            return (async function* () {
                while (!(gIterator = await g.next(next)).done) {
                    let eIterator;
                    const e = f(gIterator.value, i++);
                    if (e[Symbol.asyncIterator]) {
                        while (!(eIterator = await e.next(next)).done) {
                            next = yield (eIterator.value);
                        }
                    }
                    else {
                        while (!(eIterator = e.next(next)).done) {
                            next = yield (eIterator.value);
                        }
                    }
                    returnValue.push(eIterator.value);
                }
                return [gIterator.value, ...returnValue];
            })();
        }
        gIterator = g.next(next);
        if (gIterator.done) {
            return (function* () { return [gIterator.value]; })();
        }
        let eIterator;
        const e = f(gIterator.value, i++);
        if (e[Symbol.asyncIterator]) {
            return (async function* () {
                while (!(eIterator = await e.next(next)).done) {
                    next = yield (eIterator.value);
                }
                returnValue.push(eIterator.value);
                while (!(gIterator = g.next(next)).done) {
                    let eIterator;
                    const e = f(gIterator.value, i++);
                    while (!(eIterator = await e.next(next)).done) {
                        next = yield (eIterator.value);
                    }
                    returnValue.push(eIterator.value);
                }
                return [gIterator.value, ...returnValue];
            })();
        }
        return (function* () {
            while (!(eIterator = e.next(next)).done) {
                next = yield (eIterator.value);
            }
            returnValue.push(eIterator.value);
            while (!(gIterator = g.next(next)).done) {
                let eIterator;
                const e = f(gIterator.value, i++);
                while (!(eIterator = e.next(next)).done) {
                    next = yield (eIterator.value);
                }
                returnValue.push(eIterator.value);
            }
            return [gIterator.value, ...returnValue];
        })();
    };
}

},{}],21:[function(require,module,exports){
"use strict";
/**
 * Yield the items of an array
 *
 * Return the second argument
 *
 * @example `fromArray([0, 1, 2, 3, 4], 100)` generates 0, 1, 2, 3, 4 and returns 100
 * @template T The type of values yielded by the generators
 * @template TReturn The type of the return value of the generators
 * @param array the array to yield
 * @param returnValue the value to return
 * @returns the generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromArray = fromArray;
function* fromArray(array, returnValue) {
    for (let item of array) {
        yield item;
    }
    return returnValue;
}

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = last;
function asyncLast(size = 1) {
    return async function* (g) {
        let next;
        let iterator;
        let tuple = [];
        while (!(iterator = await g.next(next)).done) {
            tuple.push(iterator.value);
            next = yield [...tuple];
            if (tuple.length < size)
                continue;
            tuple = tuple.slice(1);
        }
        return iterator.value;
    };
}
function syncLast(size = 1) {
    return function* (g) {
        let next;
        let iterator;
        let tuple = [];
        while (!(iterator = g.next(next)).done) {
            tuple.push(iterator.value);
            next = yield [...tuple];
            if (tuple.length < size)
                continue;
            tuple = tuple.slice(1);
        }
        return iterator.value;
    };
}
/**
 * `last(size)(g)` generates arrays of `size` elements with the last elements generated of `g` (generating always one more). It returns the same as `g`.
 *
 * **Example** `last(3)(range())` generates [0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], ...
 *
 * @param {number} [size=1] The size of the tuples to generate
 */
function last(size = 1) {
    const asyncFunctor = asyncLast(size);
    const syncFunctor = syncLast(size);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = map;
function asyncMap(f) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            next = yield f(iterator.value, i++, next);
        }
        return iterator.value;
    };
}
function syncMap(f) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            next = yield f(iterator.value, i++, next);
        }
        return iterator.value;
    };
}
/**
 * `map(f)(g)` generates items `f(e, i, n)` where `e` are items of `g`, `i` is the index of `e` in `g` and `n` is the `next` passed to get `e`.
 *
 * `map(f)(g)` returns the same value as `g`.
 *
 * **Example** `map(x => x * 2)(range(0, 5))` generates 0, 2, 4, 6, 8
 * @param {function} [f] The function to apply to elements of `g`
 */
function map(f) {
    const asyncFunctor = asyncMap(f);
    const syncFunctor = syncMap(f);
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    }
    return functor;
}

},{}],24:[function(require,module,exports){
"use strict";
/**
 *
 * `mergeAll(g1, g2, ...)` generates the items of gi,... as they are generated by the generators. It returns the array of values returned by the generators in the order they end.
 *
 * ```typescript
 * clock           0   1   2   3   4   5   6   7   8   9
 * g              «a   b           e           h   i | y»
 * h              «        c   d       f   g | x»
 * mergeAll(g,h)  «a   b   c   d   e   f   g   h   i | [x, y]»
 * ```
 *
 * @param gs Array of asynchronous generators
 * @returns merged generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAll = mergeAll;
async function* mergeAll(...gs) {
    let iterator;
    let iterators = [];
    let next;
    let returnValue = [];
    let resolver;
    let freeResolver = true;
    const freeGenerators = new Set(gs);
    while (returnValue.length < gs.length) {
        iterator = await new Promise(resolve => {
            resolver = resolve;
            freeResolver = true;
            if (iterators.length) {
                resolver(iterators.splice(0, 1)[0]);
                return;
            }
            gs.forEach(async (g) => {
                if (!freeGenerators.has(g))
                    return;
                freeGenerators.delete(g);
                iterators.push(await g.next(next));
                if (!iterators.at(-1).done)
                    freeGenerators.add(g);
                if (freeResolver) {
                    resolver(iterators.splice(0, 1)[0]);
                    freeResolver = false;
                }
            });
        });
        if (iterator.done) {
            returnValue.push(iterator.value);
        }
        else {
            next = yield iterator.value;
        }
    }
    return returnValue;
}

},{}],25:[function(require,module,exports){
"use strict";
/**
 *
 * `mergeRace(g1, g2, ...)` generates the items of gi,... as they are generated by the generators. It returns the first value returned by any of them.
 *
 * ```typescript
 * clock           0   1   2   3   4   5   6   7   8   9
 * g              «a   b           e           h   i | y»
 * h              «        c   d       f   g | x»
 * mergeRace(g,h) «a   b   c   d   e   f   g | x»
 * ```
 *
 * @param gs
 * @returns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRace = mergeRace;
async function* mergeRace(...gs) {
    let iterator;
    let next;
    let iterators = [];
    let resolver;
    function listen() {
        return new Promise(resolve => {
            resolver = resolve;
            if (iterators.length) {
                resolver(iterators.splice(0, 1)[0]);
                return;
            }
            let resolved = false;
            gs.forEach(async (g) => {
                iterators.push(await g.next(next));
                if (resolved)
                    return;
                resolved = true;
                const iteratorResult = iterators.splice(0, 1)[0];
                resolver(iteratorResult);
            });
        });
    }
    while (!(iterator = await listen()).done) {
        next = yield iterator.value;
    }
    return iterator.value;
}

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicast = multicast;
function* multicastAsync(g) {
    const stored = [];
    let done = false;
    let result;
    const resolvers = [];
    const constructor = async function* () {
        let i = 0;
        let iterator;
        while (true) {
            if (i === stored.length) {
                if (done)
                    return result;
                iterator = await new Promise(resolve => resolvers.push(resolve));
                if (done = iterator.done)
                    return result || (result = iterator.value);
            }
            if (stored[i].done)
                return stored[i].value;
            yield stored[i++].value;
        }
    };
    (async () => {
        let iterator;
        while (true) {
            iterator = await g.next();
            stored.push(iterator);
            while (resolvers.length) {
                resolvers.splice(0, 1)[0](iterator);
            }
            if (iterator.done)
                return;
        }
    })();
    while (true) {
        yield constructor();
    }
}
function* multicastSync(g) {
    const stored = [];
    let done = false;
    let result;
    while (true) {
        const constructor = function* () {
            let i = 0;
            let iterator;
            while (true) {
                if (i === stored.length) {
                    if (done)
                        return result;
                    iterator = g.next();
                    if (done = iterator.done)
                        return result || (result = iterator.value);
                    stored.push(iterator);
                }
                if (stored[i].done)
                    return stored[i].value;
                yield stored[i++].value;
            }
        };
        yield constructor();
    }
}
function multicast(g) {
    if (g[Symbol.asyncIterator]) {
        return multicastAsync(g);
    }
    return multicastSync(g);
}

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicastFromNow = multicastFromNow;
function* multicastFromNowAsync(g) {
    const stored = [];
    let done = false;
    let result;
    while (true) {
        const constructor = async function* (i) {
            let iterator;
            while (true) {
                if (i === stored.length) {
                    if (done)
                        return result;
                    iterator = await g.next();
                    if (done = iterator.done)
                        return result || (result = iterator.value);
                    stored.push(iterator.value);
                }
                yield stored[i++];
            }
        };
        yield constructor(stored.length);
    }
}
function* multicastFromNowSync(g) {
    const stored = [];
    let done = false;
    let result;
    while (true) {
        const constructor = function* (i) {
            let iterator;
            while (true) {
                if (i === stored.length) {
                    if (done)
                        return result;
                    iterator = g.next();
                    if (done = iterator.done)
                        return result || (result = iterator.value);
                    stored.push(iterator.value);
                }
                yield stored[i++];
            }
        };
        yield constructor(stored.length);
    }
}
function multicastFromNow(g) {
    if (g[Symbol.asyncIterator]) {
        return multicastFromNowAsync(g);
    }
    return multicastFromNowSync(g);
}

},{}],28:[function(require,module,exports){
"use strict";
/**
 * `multicastFromStart(g)` generates independent copies of g.
 *
 * `g` is required to not have a type of `next`
 *
 * The return value of each copy is the same as that of the original generator `g` (and replays all items generated by `g`).
 *
 * `multicastFromStart(g)` never returns.
 *
 * **Example** If `[c1, c2] = [...take(2)(multicastFromStart(2)(range()))]`, then we can consume all elements of c1 (thus consuming g) without consuming the elements of c2.
 *
 * @param {number} [g] the generator to multicastFromStart
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicastFromStart = void 0;
var multicast_1 = require("./multicast");
Object.defineProperty(exports, "multicastFromStart", { enumerable: true, get: function () { return multicast_1.multicast; } });

},{"./multicast":26}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = pick;
function asyncPick(indexes, returnValue) {
    return async function* (g) {
        let generation = [];
        let next;
        let iterator;
        for (let index of indexes) {
            while (!(iterator === null || iterator === void 0 ? void 0 : iterator.done) && index >= generation.length) {
                iterator = await g.next(next);
                if (iterator.done) {
                    returnValue || (returnValue = iterator.value);
                }
                else {
                    generation.push(iterator.value);
                }
            }
            next = yield index >= generation.length ? undefined : generation[index];
        }
        return returnValue;
    };
}
function syncPick(indexes, returnValue) {
    return function* (g) {
        let generation = [];
        let next;
        let iterator;
        for (let index of indexes) {
            while (!(iterator === null || iterator === void 0 ? void 0 : iterator.done) && index >= generation.length) {
                iterator = g.next(next);
                if (iterator.done) {
                    returnValue || (returnValue = iterator.value);
                }
                else {
                    generation.push(iterator.value);
                }
            }
            next = yield index >= generation.length ? undefined : generation[index];
        }
        return returnValue;
    };
}
/**
 * The `i`-th element of `pick(indexes)(g)` is the `j`-th item of `g` (potentially `undefined`, if `g` does not have `j` items), where `j` is the `i`-th item in `indexes`
 *
 * `pick(indexes)(g)` passes down to `g` the `next` value passed to `pick` for each `i` in `indexes`, which does not correspond to the items generated by `g`.
 *
 * `pick(indexes)(g)` returns the returning value of `g` if it finished.
 *
 * `pick(indexes, returnValue)(g)` returns `returnValue` when either `indexes` or `g` end.
 *
 * **Example** `pick([1, 0, 0, 2])(range())` generates 1, 0, 0, 2
 * @param {array} [indexes] the array of indexes
 * @param {array} [returnValue] the return value
 */
function pick(indexes, returnValue) {
    const asyncFunctor = asyncPick(indexes, returnValue);
    const syncFunctor = syncPick(indexes, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],30:[function(require,module,exports){
"use strict";
/**
 * `pipe(...c)(g)` generates items of `g` and passes them through the generator constructors `c_i`
 *
 * **Example** `pipe(drop(5), take(10), filter(x => x % 2 === 0))(range())` generates 6, 8, 10, 12, 14
 * @param {Array} [constructors] The generator constructors
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = pipe;
function pipe(...constructors) {
    return function (g) {
        for (let constructor of constructors) {
            g = constructor(g);
        }
        return g;
    };
}

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepend = prepend;
function asyncPrepend(object) {
    return async function* (g) {
        let iterator;
        let next;
        while (!(iterator = await object.next(next)).done) {
            next = yield iterator.value;
        }
        while (!(iterator = await g.next(next)).done) {
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function syncPrepend(object) {
    return function* (g) {
        let iterator;
        let next;
        while (!(iterator = object.next(next)).done) {
            next = yield iterator.value;
        }
        while (!(iterator = g.next(next)).done) {
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function prepend(object) {
    return object[Symbol.asyncIterator]
        ? asyncPrepend(object)
        : syncPrepend(object);
}

},{}],32:[function(require,module,exports){
"use strict";
/**
 * `range(start?, end?, step?, returnValue?)` generates numbers from `start` (included) to `end` (excluded) distanced a `step`, either increasing or decreasing
 *
 * If given a `returnValue`, `range` returns it when it reaches the end.
 *
 * **Example** `range()` generates 0, 1, 2, 3, 4, 5, 6, 7, 8, 9...
 *
 * **Example** `range(1, 10)` generates 1, 2, 3, 4, 5, 6, 7, 8, 9
 *
 * **Example** `range(10, 1, 2)` generates 10, 8, 6, 4, 2
 * @param {number} [start=0] The first number in the range
 * @param {number} [end=Infinity] The first number after `start` that is beyond the range
 * @param {number} [step=1] The distance between two numbers in the range. Its sign is not taken into account
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = range;
function* range(start = 0, end = Infinity, step = 1, vReturn) {
    if ((end - start) * step === 0)
        return;
    if ((end - start) * step <= 0)
        step = -step;
    for (let i = start; step > 0 ? i < end : i > end; i += step) {
        yield i;
    }
    return vReturn;
}

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = reduce;
function asyncReduce(f, u) {
    return async function* (g) {
        let next;
        let iterator;
        let i = 0;
        while (!(iterator = await g.next(next)).done) {
            next = yield u = f(u, iterator.value, i++, next);
        }
        return iterator.value;
    };
}
function syncReduce(f, u) {
    return function* (g) {
        let next;
        let iterator;
        let i = 0;
        while (!(iterator = g.next(next)).done) {
            next = yield u = f(u, iterator.value, i++, next);
        }
        return iterator.value;
    };
}
/**
 * `reduce(f, dflt)(g)` generates items `r[i] = f(r[i-1], e)`, and `r[0] = d` and returns the return value of `g`
 *
 * **Example** `reduce((acc, x) => acc + x, 0)(range(0, 5))` generates 0, 1, 3, 6, 10
 * @param {function} [f] The function to apply to combine elements of `g`
 * @param {function} [u] The default value. If `undefined`, the first item of `g` is taken as default.
 */
function reduce(f, u) {
    const asyncFunctor = asyncReduce(f, u);
    const syncFunctor = syncReduce(f, u);
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    }
    return functor;
}

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returning = returning;
function asyncReturning(returnValue) {
    return async function* (g) {
        let next;
        let i;
        while (!(i = await g.next(next)).done) {
            next = yield i.value;
        }
        return returnValue;
    };
}
function syncReturning(returnValue) {
    return function* (g) {
        let next;
        let i;
        while (!(i = g.next(next)).done) {
            next = yield i.value;
        }
        return returnValue;
    };
}
/**
 *
 * `returning(value)(g)` generates the same as `g`, and when `g` ends, returns `value`
 *
 * @param returnValue The value to return
 * @returns
 */
function returning(returnValue) {
    const asyncFunctor = asyncReturning(returnValue);
    const syncFunctor = syncReturning(returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returningMap = returningMap;
function asyncReturningMap(returnMap) {
    return async function* (g) {
        let next;
        let i = 0;
        let iterator;
        while (!(iterator = await g.next(next)).done) {
            i++;
            next = yield iterator.value;
        }
        return returnMap(iterator.value, i, next);
    };
}
function syncReturningMap(returnMap) {
    return function* (g) {
        let next;
        let i = 0;
        let iterator;
        while (!(iterator = g.next(next)).done) {
            i++;
            next = yield iterator.value;
        }
        return returnMap(iterator.value, i, next);
    };
}
/**
 *
 * `returningMap(f)(g)` generates the same as `g`, and when `g` returns `value`, `returningMap(f)(g)` returns `f(value, i, next)` (with `i` the length of `g` and `next` the value used to generate it)
 *
 * @param returnMap the function to apply. It takes the return value of `g`, the length of `g` and the last `next` value.
 * @returns
 */
function returningMap(returnMap) {
    const asyncFunctor = asyncReturningMap(returnMap);
    const syncFunctor = syncReturningMap(returnMap);
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    }
    return functor;
}

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returns = returns;
async function asyncReturns(g) {
    let i;
    while (!(i = await g.next()).done) { }
    return i.value;
}
function syncReturns(g) {
    let i;
    while (!(i = g.next()).done) { }
    return i.value;
}
function returns(g) {
    if (g[Symbol.asyncIterator]) {
        return asyncReturns(g);
    }
    return syncReturns(g);
}

},{}],37:[function(require,module,exports){
"use strict";
/**
 * `sequence(f, ...initialValues)` generates, first, the initial values and, after, the values produced by the function f over the last values generated
 *
 * **Example** sequence((a, b) => a + b, 1, 1) generates the fibonacci sequence
 *
 * @param {Function} [f] the sequence function. It takes the last `n` items generated and returns the next one
 * @param {array} [initialValues] the first values to generate (initialValues.length >= n)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequence = sequence;
function* sequence(f, ...initialValues) {
    let args = [];
    for (let item of initialValues) {
        yield item;
        args.push(item);
    }
    args = args.splice(args.length - f.length);
    while (true) {
        const item = f(...args);
        yield item;
        args.push(item);
        args.splice(0, 1);
    }
}

},{}],38:[function(require,module,exports){
"use strict";
/**
 * `slice(start, end, step)(g)` gets items indexed `i` on `g`, where 0 <= `start` <= `i` < `end`, and if `i` is an index, the next index is `i + step`.
 *
 * **Example** `slice(5, 10)(range())` generates 5, 6, 7, 8, 9
 *
 * **Example** `slice(5, 10, 2)(range())` generates 5, 7, 9
 *
 * `slice(start, end, step, returnValue)(g)` ~~ `pipe(drop(start), take(end - start, returnValue), step(step))(g)`
 * @param {number} [start=0] The index on `g` of the first item of `g` to generate
 * @param {number} [end=Infinity] The index on `g` of the first item of `g` to not generate
 * @param {number} [step=1] The distance in two consecutive indexes on `g` to generate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.slice = slice;
const take_1 = require("./take");
const drop_1 = require("./drop");
const step_1 = require("./step");
const pipe_1 = require("./pipe");
function slice(start = 0, end = Infinity, step = 1, returnValue) {
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return (0, pipe_1.pipe)((0, drop_1.drop)(start), (0, take_1.take)(end - start), (0, step_1.step)(step, returnValue))(g);
        }
        return (0, pipe_1.pipe)((0, drop_1.drop)(start), (0, take_1.take)(end - start), (0, step_1.step)(step, returnValue))(g);
    }
    return functor;
}

},{"./drop":12,"./pipe":30,"./step":42,"./take":44}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.some = some;
function asyncSome(p) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        let value = false;
        while (!(iterator = await g.next(next)).done) {
            value || (value = p(iterator.value, i++, next));
            next = yield value;
            if (value)
                return iterator.value;
        }
        return iterator.value;
    };
}
function syncSome(p) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        let value = false;
        while (!(iterator = g.next(next)).done) {
            value || (value = p(iterator.value, i++, next));
            next = yield value;
            if (value)
                return iterator.value;
        }
        return iterator.value;
    };
}
/**
 *
 * `some(p)(g)` generates false until an element of `g` satisfies a predicate, in which case it generates true.
 *
 * It returns the value that fulfilled `p`, if some did, or the value that returns `g`.
 *
 * `some` does not apply `p` to the return value of `g`.
 *
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns
 */
function some(p) {
    const asyncFunctor = asyncSome(p);
    const syncFunctor = syncSome(p);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortInsert = sortInsert;
function asyncSortInsert(item, sort) {
    return async function* (g) {
        let next;
        let previousNext;
        let iterator;
        let inserted = false;
        while (!(iterator = await g.next(next)).done) {
            if (sort(item, iterator.value) <= 0) {
                next = yield item;
                inserted = true;
                break;
            }
            next = yield iterator.value;
        }
        if (!inserted) {
            yield item;
            return iterator.value;
        }
        previousNext = next;
        next = yield iterator.value;
        while (!(iterator = await g.next(previousNext)).done) {
            previousNext = next;
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function syncSortInsert(item, sort) {
    return function* (g) {
        let next;
        let previousNext;
        let iterator;
        let inserted = false;
        while (!(iterator = g.next(next)).done) {
            if (sort(item, iterator.value) <= 0) {
                next = yield item;
                inserted = true;
                break;
            }
            next = yield iterator.value;
        }
        if (!inserted) {
            yield item;
            return iterator.value;
        }
        previousNext = next;
        next = yield iterator.value;
        while (!(iterator = g.next(previousNext)).done) {
            previousNext = next;
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
/**
 * If `g` is a sorted generator (according to `sort`), then `sortInsert(item, sort)(g)` generates the items of `g` including `item` following order given by `sort`.
 *
 * `sortInsert(item, sort)(g)` provides to `g` consecutive `next` values, irrespective of the insertion of the item.
 *
 * **Example** `sortInsert(5, (a, b) => a - b)(range(0, 10, 2))` generates 0, 2, 4, 5, 6, 8
 *
 * @param {T} [item] The item to insert in the generated output
 * @param {function} [sort] The sorting function. `sort(a, b) < 0` iff a < b. `sort(a, b) == 0` if a = b. `sort(a, b) > 0` if a > b.
 */
function sortInsert(item, sort) {
    const asyncFunctor = asyncSortInsert(item, sort);
    const syncFunctor = syncSortInsert(item, sort);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortMerge = sortMerge;
function asyncSortMerge(h, sort) {
    return async function* (g) {
        let next = [];
        let gNextIndex = 0;
        let hNextIndex = 0;
        let gIterator = await g.next(next[gNextIndex]);
        let hIterator = await h.next(next[hNextIndex]);
        while (!gIterator.done && !hIterator.done) {
            if (sort(gIterator.value, hIterator.value) <= 0) {
                next.push(yield gIterator.value);
                gIterator = await g.next(next[gNextIndex++]);
            }
            else {
                next.push(yield hIterator.value);
                hIterator = await h.next(next[hNextIndex++]);
            }
        }
        if (!gIterator.done)
            next.push(yield gIterator.value);
        if (!hIterator.done)
            next.push(yield hIterator.value);
        while (!gIterator.done && !(gIterator = await g.next(next[gNextIndex++])).done) {
            next.push(yield gIterator.value);
        }
        while (!hIterator.done && !(hIterator = await h.next(next[hNextIndex++])).done) {
            next.push(yield hIterator.value);
        }
        return [gIterator.value, hIterator.value];
    };
}
function syncSortMerge(h, sort) {
    return function* (g) {
        let next = [];
        let gNextIndex = 0;
        let hNextIndex = 0;
        let gIterator = g.next(next[gNextIndex]);
        let hIterator = h.next(next[hNextIndex]);
        while (!gIterator.done && !hIterator.done) {
            if (sort(gIterator.value, hIterator.value) <= 0) {
                next.push(yield gIterator.value);
                gIterator = g.next(next[gNextIndex++]);
            }
            else {
                next.push(yield hIterator.value);
                hIterator = h.next(next[hNextIndex++]);
            }
        }
        if (!gIterator.done)
            next.push(yield gIterator.value);
        if (!hIterator.done)
            next.push(yield hIterator.value);
        while (!gIterator.done && !(gIterator = g.next(next[gNextIndex++])).done) {
            next.push(yield gIterator.value);
        }
        while (!hIterator.done && !(hIterator = h.next(next[hNextIndex++])).done) {
            next.push(yield hIterator.value);
        }
        return [gIterator.value, hIterator.value];
    };
}
function sortMerge(h, sort) {
    if (h[Symbol.asyncIterator]) {
        return asyncSortMerge(h, sort);
    }
    return syncSortMerge(h, sort);
}

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.step = step;
function asyncStep(distance = 1, returnValue) {
    return async function* (g) {
        let next;
        let iterator;
        let current = 1;
        while (!(iterator = await g.next(next)).done) {
            if (--current)
                continue;
            current = distance;
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
function syncStep(distance = 1, returnValue) {
    return function* (g) {
        let next;
        let iterator;
        let current = 1;
        while (!(iterator = g.next(next)).done) {
            if (--current)
                continue;
            current = distance;
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
/**
 * `step(distance)(g)` gets the elements of `g` separated `distance` items between each.
 *
 * `step(distance, returnValue)(g)` returns `returnValue` if specified. Otherwise, it returns the returned value of `g`.
 *
 * **Example** `step(5)(range())` generates 0, 5, 10, 15...
 *
 * @param {number} [distance=0] The index difference of items of `g` to be generated by `step(distance)(g)`
 */
function step(distance = 1, returnValue) {
    const asyncFunctor = asyncStep(distance, returnValue);
    const syncFunctor = syncStep(distance, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagFeed = tagFeed;
async function* asyncTagFeed(g) {
    let next;
    let iterator;
    while (!(iterator = await g.next(next)).done) {
        next = yield [iterator.value, next];
    }
    return [iterator.value, next];
}
function* syncTagFeed(g) {
    let next;
    let iterator;
    while (!(iterator = g.next(next)).done) {
        next = yield [iterator.value, next];
    }
    return [iterator.value, next];
}
function tagFeed(g) {
    if (g[Symbol.asyncIterator]) {
        return asyncTagFeed(g);
    }
    return syncTagFeed(g);
}

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.take = take;
function asyncTake(n = 1, returnValue) {
    return async function* (g) {
        let next;
        let i;
        while (n-- && !(i = await g.next(next)).done) {
            next = yield i.value;
        }
        if (i.done) {
            return i.value;
        }
        return returnValue;
    };
}
function syncTake(n = 1, returnValue) {
    return function* (g) {
        let next;
        let i;
        while (n-- && !(i = g.next(next)).done) {
            next = yield i.value;
        }
        if (i.done) {
            return i.value;
        }
        return returnValue;
    };
}
/**
 * `take(n)(g)` generates the first `n` (**default** 1) items of `g`
 *
 * If `g` runs out before reaching `n` elements, `take(n, value)(g)` returns the return value of `g`. Otherwise, it returns `value`.
 *
 * **Example** `take(5)(range())` generates 0, 1, 2, 3, 4
 * @param {number} [n = 1] The amount of items to generate
 * @param {TReturn} [returnValue] The value to return if `g` runs out
 */
function take(n = 1, returnValue) {
    const asyncFunctor = asyncTake(n, returnValue);
    const syncFunctor = syncTake(n, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeWhile = takeWhile;
function asyncTakeWhile(p, returnValue) {
    return async function* (g) {
        let i = 0;
        let next;
        let iterator;
        while (!(iterator = await g.next(next)).done) {
            if (!p(iterator.value, i++, next))
                return returnValue;
            next = yield iterator.value;
        }
        if (iterator.done)
            return iterator.value;
        return returnValue;
    };
}
function syncTakeWhile(p, returnValue) {
    return function* (g) {
        let i = 0;
        let next;
        let iterator;
        while (!(iterator = g.next(next)).done) {
            if (!p(iterator.value, i++, next))
                return returnValue;
            next = yield iterator.value;
        }
        if (iterator.done)
            return iterator.value;
        return returnValue;
    };
}
/**
 * `takeWhile(p)(g)` generates items `e` of `g` as long `p(e, index, next)` holds (`index` is the index of `e` in `g` and `next` is the next value used to generate it)
 *
 * If `g` finishes before finsing the item that fulfils `p`, `takeWhile(p, v)(g)` returns `v`
 *
 * **Example** `takeWhile(x => x % 6 !== 5)(range())` generates 0, 1, 2, 3, 4
 * @param {Function} [p] The predicate that is checked against items of `g`, their indexes and the previous next value.
 * @param {TReturn} [returnValue] The value to return if g runs out
 */
function takeWhile(p, returnValue) {
    const asyncFunctor = asyncTakeWhile(p, returnValue);
    const syncFunctor = syncTakeWhile(p, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tap = tap;
function asyncTap(f) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            f(iterator.value, i++, next);
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function syncTap(f) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            f(iterator.value, i++, next);
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
/**
 * `tap(f)(g)` applies `f(e)` where `e` are items of `g`, and generates `e` unchanged. It returns the same as `g`.
 *
 * @param {function} [f] The function to apply to elements of `g`
 */
function tap(f) {
    const asyncFunctor = asyncTap(f);
    const syncFunctor = syncTap(f);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = throttle;
function awaitThrottle(ms, asyncGenerator, next) {
    return new Promise(resolve => {
        let locked = true;
        const resolver = (iteratorResult) => {
            if (locked) {
                asyncGenerator.next(next).then(resolver);
            }
            else {
                resolve(iteratorResult);
            }
        };
        setTimeout(() => {
            locked = false;
        }, ms);
        asyncGenerator.next(next).then(resolver);
    });
}
function throttle(ms) {
    return async function* (g) {
        let next;
        let iterator = await g.next(next);
        if (iterator.done)
            return iterator.value;
        next = yield Promise.resolve(iterator.value);
        while (!(iterator = await awaitThrottle(ms, g, next)).done) {
            next = yield Promise.resolve(iterator.value);
        }
        return iterator.value;
    };
}

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = toArray;
async function asyncToArray(g) {
    let iterator;
    let result = [];
    while (!(iterator = await g.next()).done) {
        result.push(iterator.value);
    }
    return result;
}
function syncToArray(g) {
    let iterator;
    let result = [];
    while (!(iterator = g.next()).done) {
        result.push(iterator.value);
    }
    return result;
}
function toArray(g) {
    if (g[Symbol.asyncIterator]) {
        return asyncToArray(g);
    }
    return syncToArray(g);
}

},{}],49:[function(require,module,exports){
"use strict";
/**
 * ```typescript
 * toAsync(«1, 2 | 'A'») = [Promise.resolve(1), Promise.resolve(2) | 'A']
 * ```
 *
 * `toAsync(g)` takes a synchronous generators and generates its items asynchronously. It returns the same value as `g`.
 *
 * @param g a synchronous generator
 * @returns the equivalent asynchronous generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAsync = toAsync;
async function* toAsync(g) {
    let next;
    let iterator;
    while (!(iterator = g.next(next)).done) {
        next = yield await Promise.resolve(iterator.value);
    }
    return iterator.value;
}

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transposeAll = transposeAll;
async function* asyncTransposeAll(...gs) {
    let next;
    let done = false;
    const returnValues = Array(gs.length).fill(null);
    while (!done) {
        done = true;
        const value = await Promise.all(gs.map(async (g, i) => {
            const iterator = await g.next(next);
            if (iterator.done) {
                returnValues[i] || (returnValues[i] = iterator.value);
                return undefined;
            }
            done = false;
            return iterator.value;
        }));
        if (done)
            return returnValues;
        next = yield value;
    }
}
function* syncTransposeAll(...gs) {
    let next;
    let done = false;
    const returnValues = Array(gs.length).fill(null);
    while (!done) {
        done = true;
        const value = gs.map((g, i) => {
            const iterator = g.next(next);
            if (iterator.done) {
                returnValues[i] || (returnValues[i] = iterator.value);
                return undefined;
            }
            done = false;
            return iterator.value;
        });
        if (done)
            return returnValues;
        next = yield value;
    }
}
function transposeAll(...gs) {
    if (gs.length === 0)
        return;
    if (gs[0][Symbol.asyncIterator]) {
        return asyncTransposeAll(...gs);
    }
    return syncTransposeAll(...gs);
}

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transposeRace = transposeRace;
async function* asyncTransposeRace(...gs) {
    let done = false;
    let next;
    const returnValue = Array(gs.length).fill(undefined);
    while (!done) {
        const value = await Promise.all(gs.map(async (g, i) => {
            const iteratorResult = await g.next(next);
            if (!iteratorResult.done)
                return iteratorResult.value;
            done = true;
            returnValue[i] = iteratorResult.value;
        }));
        if (done)
            return returnValue;
        next = yield value;
    }
}
function* syncTransposeRace(...gs) {
    let done = false;
    let next;
    const returnValue = Array(gs.length).fill(undefined);
    while (!done) {
        const value = gs.map((g, i) => {
            const iteratorResult = g.next(next);
            if (!iteratorResult.done)
                return iteratorResult.value;
            done = true;
            returnValue[i] = iteratorResult.value;
        });
        if (done)
            return returnValue;
        next = yield value;
    }
}
function transposeRace(...gs) {
    if (gs.length === 0)
        return;
    if (gs[0][Symbol.asyncIterator]) {
        return asyncTransposeRace(...gs);
    }
    return syncTransposeRace(...gs);
}

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = tryCatch;
function asyncTryCatch(onCatch, doFinally) {
    return async function* (g) {
        let iterator;
        let next;
        try {
            while (!(iterator = await g.next(next)).done) {
                next = yield iterator.value;
            }
            return [iterator.value, null];
        }
        catch (err) {
            return [null, onCatch(err)];
        }
        finally {
            if (typeof doFinally === 'function') {
                doFinally();
            }
        }
    };
}
function syncTryCatch(onCatch, doFinally) {
    return function* (g) {
        let iterator;
        let next;
        try {
            while (!(iterator = g.next(next)).done) {
                next = yield iterator.value;
            }
            return [iterator.value, null];
        }
        catch (err) {
            return [null, onCatch(err)];
        }
        finally {
            if (typeof doFinally === 'function') {
                doFinally();
            }
        }
    };
}
/**
 * `tryCatch(onCatch)(«1, 2, throw 'Error 1', 3, throw 'Error 2' | 'A'») = «1, 2 | [null, 'Error 2']»
 *
 * `tryCatch(onCatch)(«1, 2, 3 | 'A'») = «1, 2, 3 | ['A', null]»
 *
 * @param onCatch
 * @returns
 */
function tryCatch(onCatch, doFinally) {
    const asyncFunctor = asyncTryCatch(onCatch, doFinally);
    const syncFunctor = syncTryCatch(onCatch, doFinally);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yieldReturnValue = yieldReturnValue;
async function* asyncYieldReturnValue(g) {
    let next;
    let i;
    while (!(i = await g.next(next)).done) {
        next = yield i.value;
    }
    yield i.value;
}
function* syncYieldReturnValue(g) {
    let next;
    let i;
    while (!(i = g.next(next)).done) {
        next = yield i.value;
    }
    yield i.value;
}
function yieldReturnValue(g) {
    if (g[Symbol.asyncIterator]) {
        return asyncYieldReturnValue(g);
    }
    return syncYieldReturnValue(g);
}

},{}]},{},[1])(1)
});

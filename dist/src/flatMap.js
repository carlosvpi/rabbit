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

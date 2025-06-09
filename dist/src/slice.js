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

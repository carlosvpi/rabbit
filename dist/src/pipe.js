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

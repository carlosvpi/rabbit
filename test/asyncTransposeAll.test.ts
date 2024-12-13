import {describe, expect, test} from '@jest/globals';
import { asyncTransposeAll } from '../src/asyncTransposeAll';
import { multicastAsync } from '../src/multicastAsync';
import { fromArray } from '../src/fromArray';
import { toAsync } from '../src/toAsync';
import { asyncToArray } from '../src/asyncToArray';
import { asyncMap } from '../src/asyncMap';

describe('asyncTransposeAll', () => {
  test('should mix two asynchronous generators that are multicasts of an original one without reduplicating values', async () => {
    const multicasted = multicastAsync(toAsync(fromArray([1,2,3,4])))
    const c1 = multicasted.next().value
    const c2 = multicasted.next().value
    const result = asyncMap(([a, b]: number[]) => 2**a + 3**b)(asyncTransposeAll(c1, c2))
    expect(await asyncToArray(result)).toEqual([5, 13, 35, 97]);
  });
});
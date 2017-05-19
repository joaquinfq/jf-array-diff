# jf-array-diff [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm install jf-array-diff](https://nodei.co/npm/jf-array-diff.png?compact=true)](https://npmjs.org/package/jf-array-diff/)

Find diffs of two arrays. You can compare keys of objects too.

## Examples

```js
const assert      = require('assert');
const jfArrayDiff = require('./index');
assert.deepStrictEqual(
    jfArrayDiff(
        [],
        []
    ),
    [[], [], []]
);
assert.deepStrictEqual(
    jfArrayDiff(
        [0],
        [1]
    ),
    [[0], [], [1]]
);
assert.deepStrictEqual(
    jfArrayDiff(
        [],
        [0, 1, 2]
    ),
    [[], [], [0, 1, 2]]
);
assert.deepStrictEqual(
    jfArrayDiff(
        [0, 1, 2],
        []
    ),
    [[0, 1, 2], [], []]
);
assert.deepStrictEqual(
    jfArrayDiff(
        [0, 1, 2],
        [0, 1, 2]
    ),
    [[], [0, 1, 2], []]
);
assert.deepStrictEqual(
    jfArrayDiff(
        [0, 2, 3],
        [0, 1, 2, 4]
    ),
    [[3], [0, 2], [1, 4]]
);
assert.deepStrictEqual(
    jfArrayDiff(
        {},
        {}
    ),
    [[], [], []]
);
assert.deepStrictEqual(
    jfArrayDiff(
        {
            a : 1,
            b : 2
        },
        {
            a : 1,
            b : 3
        }
    ),
    [[], ['a', 'b'], []]
);
assert.deepStrictEqual(
    jfArrayDiff(
        {
            a : 1,
            b : 2,
            d : 4
        },
        {
            a : 1,
            c : 3,
            d : 4,
            e : 5
        }
    ),
    [['b'], ['a', 'd'], ['c', 'e']]
);
```

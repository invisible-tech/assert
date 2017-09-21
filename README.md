# @invisible/assert

[![CircleCI](https://circleci.com/gh/invisible-tech/assert/tree/master.svg?style=svg&circle-token=3be7ac521e0f2fb0f6b30ca7459a4d0b5b536083)](https://circleci.com/gh/invisible-tech/assert/tree/master)

Assertion library to allow one to throw custom errors.

`@invisible/assert` uses ES2015 Proxies to intercept calls to `assert`.
All methods of `assert` are available, and it is compatible with both
`Node.js`'s standard assertion library and the one on `npm`.

## Motivation

To allow `assert` to throw custom errors.

## Example

### `assert` encapsulates Custom Errors under an AssertionError, which sucks
```js
const assert = require('assert')
assert(false, Error('yohoo')

{ AssertionError: Error: yohoo
    at Object.<anonymous> (/tmp/a/index.js:2:1)
  name: 'AssertionError',
  actual: false,
  expected: true,
  operator: '==',
  message: 
   Error: yohoo
       at Object.<anonymous> (/tmp/a/index.js:2:15)
  generatedMessage: false }
```

_Stack-trace trimmed for readability._

### `@invisible/assert` throws Custom Errors properly, which is nice

```js
const assert = require('assert')
assert(false, Error('yohoo'))
Error: yohoo
    at Object.<anonymous> (/tmp/a/index.js:2:16)
```

_Stack-trace trimmed for readability._

## Installation

```sh
npm install @invisible/assert
```

NB: The `npm` library `assert` is not a dependency in `package.json` in order to
allow one to use Node.js's standard `assert` library.

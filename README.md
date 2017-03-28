# presume

Assertion library to allow one to throw custom errors.

`presume` uses ES2015 Proxies to intercept calls to `assert`.
All methods of `assert` are available, and it is compatible with both
`Node.js`'s standard assertion library and the one on `npm`.

## Motivation

To allow `assert` to throw custom errors.

## Example

### `assert` encapsulates Custom Error under an AssertionError, which sucks
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

### `presume` throws Custom Error properly, which is nice

```js
const presume = require('presume')
presume(false, Error('yohoo'))
Error: yohoo
    at Object.<anonymous> (/tmp/a/index.js:2:16)
```

_Stack-trace trimmed for readability._

## Installation

Make sure `assert` is installed. 

The `npm` library `assert` is not a `dependency` in `package.json` in order to
allow one to use `Node.js`'s standard `assert` library.

## Naming things is hard

Presume was only of the very few names available on npm similar to "assert".

> Assume and presume both mean to believe something before it happens, but when you assume you're not really sure. If someone bangs on your door in the middle of the night, you might assume (and hope!) it's your crazy neighbor. If your neighbor knocks on your door every night at 6:30, at 6:29 you can presume she's coming over in a minute.

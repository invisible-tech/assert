'use strict'

const assert = require('assert')

const messageArgumentIndex = {
  // assert(value[, message])
  undefined: 1,
  // assert.deepEqual(actual, expected[, message])
  deepEqual: 2,
  // assert.deepStrictEqual(actual, expected[, message])
  deepStrictEqual: 2,
  // assert.doesNotThrow(block[, error][, message])
  doesNotThrow: 2,
  // assert.equal(actual, expected[, message])
  equal: 2,
  // Ignoring "fail" expecting message as third argument
  // assert.fail(message)
  // assert.fail(actual, expected[, message[, operator[, stackStartFunction]]])
  fail: 0,
  // assert.ifError(value)
  ifError: Infinity,
  // assert.notDeepEqual(actual, expected[, message])
  notDeepEqual: 2,
  // assert.notDeepStrictEqual(actual, expected[, message])
  notDeepStrictEqual: 2,
  // assert.notEqual(actual, expected[, message])
  notEqual: 2,
  // assert.notStrictEqual(actual, expected[, message])
  notStrictEqual: 2,
  // assert.ok(value[, message])
  ok: 1,
  // assert.strictEqual(actual, expected[, message])
  strictEqual: 2,
  // assert.throws(block[, error][, message])
  throws: 2,
}

function avowify(fn, methodName) {
  return function (...args) {
    try { fn(...args) }
    catch (e) {
      /**
       *  Node.js's assert does not allow passing of Error Objects any more
       *
       *  See: https://git.io/vQcv7
       *  As of Node 8, when `assert` fails, it throws a new AssertionError.
       *  Thus, if you pass an Error object to a call to `assert` it will ignore
       *  it.
       *
       *  In order to throw custom errors, we refer to the original
       *  arguments passed into avow.
       *
       *  This will also work for Node 7 and under.
       */
      const index = messageArgumentIndex[methodName]
      const message = index && args[index]
      if (message) throw message
      throw e
    }
  }
}

const handler = {
  // e.g. avow.equal(...)
  get: (target, methodName) => avowify(target[methodName], methodName),
  // e.g. avow(...)
  apply: (target, thisArg, args) => avowify(target, undefined).apply(thisArg, args)
}

const avow = new Proxy(assert, handler)

module.exports = avow

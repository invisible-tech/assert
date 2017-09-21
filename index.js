'use strict'

const assert = require('assert')
const { parse } = require('parse-function')()

const getMessageIndex = fn => {
  const { args } = parse(fn)
  return args.indexOf('message')
}

function mixin(fn, methodName) {
  return function (...args) {
    try { return fn(...args) }
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
       *  arguments.
       *
       *  This will also work for Node 7 and under.
       */
      const index = getMessageIndex(fn)
      const message = args[index]
      if (message) throw message
      throw e
    }
  }
}

const handler = {
  // e.g. assert.equal(...)
  get: (target, methodName) => mixin(target[methodName], methodName),
  // e.g. assert(...)
  apply: (target, thisArg, args) => mixin(target, undefined).apply(thisArg, args)
}

const invisibleAssert = new Proxy(assert, handler)

module.exports = invisibleAssert

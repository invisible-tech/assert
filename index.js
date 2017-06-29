'use strict'

const assert = require('assert')

function avowify(fn) {
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
      const lastArg = args[args.length - 1]
      if (lastArg instanceof Error) throw lastArg
      throw e
    }
  }
}

const handler = {
  // e.g. avow.equal(...)
  get: (target, method) => avowify(target[method]),
  // e.g. avow(...)
  apply: (target, thisArg, args) => avowify(target).apply(thisArg, args)
}

const avow = new Proxy(assert, handler)

module.exports = avow

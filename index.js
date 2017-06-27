'use strict'

const assert = require('assert')

function avowify(fn) {
  return function (...args) {
    try { fn(...args) }
    catch (e) {
      /**
       *  Node.js's assert does not allow passing of Error Objects any more
       *
       *  See: https://github.com/nodejs/node/blob/master/lib/assert.js
       *  As of Node v8.1.2, assert.ok (alias of just assert) is defined as
       *
       *    function ok(value, message) {
       *      if (!value) fail(value, true, message, '==', assert.ok);
       *    }
       *
       *  So, in order to throw custom errors, we refer to the original
       *  arguments passed into avow.
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

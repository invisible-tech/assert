'use strict'

const assert = require('assert')
const { parse } = require('parse-function')()

const getMessageIndex = fn => {
  const { args } = parse(fn)
  return args.indexOf('message')
}

function avowify(fn, methodName) {
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
       *  arguments passed into avow.
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
  // e.g. avow.equal(...)
  get: (target, methodName) => avowify(target[methodName], methodName),
  // e.g. avow(...)
  apply: (target, thisArg, args) => avowify(target, undefined).apply(thisArg, args)
}

const avow = new Proxy(assert, handler)

module.exports = avow

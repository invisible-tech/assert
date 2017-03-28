'use strict'

const assert = require('assert')

function presumify(fn) {
  return function (...args) {
    try { fn(...args) }
    catch (e) {
      throw e.message ? e.message : e
    }
  }
}

const handler = {
  // e.g. presume.equal(...)
  get: (target, method) => presumify(target[method]),
  // e.g. presume(...)
  apply: (target, thisArg, args) => presumify(target).apply(thisArg, args)
}

const presume = new Proxy(assert, handler)

module.exports = presume

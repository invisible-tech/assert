'use strict'

const assert = require('assert')

function avowify(fn) {
  return function (...args) {
    try { fn(...args) }
    catch (e) {
      throw e.message ? e.message : e
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

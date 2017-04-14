'use strict'

const test = require('ava')
const assert = require('assert')

const avow = require('../')

test('Compatible behavior with assert', t => {
  avow(true)
  avow.ok(true)
  avow.deepEqual({ a: 1 }, { a: '1' })
  avow.deepStrictEqual({ a: 1 }, { a: 1 })
  avow.doesNotThrow(() => null)
  avow.equal(1, '1')
  avow.ifError()
  avow.notDeepEqual({ a: 2 }, { a: '1' })
  avow.notDeepStrictEqual({ a: 1 }, { a: '1' })
  avow.notEqual(1, 2)
  avow.notStrictEqual(1, '1')
  avow.ok(true)
  avow.strictEqual(1, 1)
  avow.throws(() => { throw Error() })

  assert.throws(() => avow.fail(1, 2, undefined, '>'))
  assert.throws(() => avow(false))
  assert.throws(() => avow.ok(false))
  assert.throws(() => avow.deepEqual({ a: 1 }, { a: 2 }))
  assert.throws(() => avow.deepStrictEqual({ a: 1 }, { a: '1' }))
  assert.throws(() => avow.doesNotThrow(() => { throw Error() }))
  assert.throws(() => avow.equal(1, 2))
  assert.throws(() => avow.ifError(true))
  assert.throws(() => avow.notDeepEqual({ a: 2 }, { a: '2' }))
  assert.throws(() => avow.notDeepStrictEqual({ a: 1 }, { a: 1 }))
  assert.throws(() => avow.notEqual(1, 1))
  assert.throws(() => avow.notStrictEqual(1, 1))
  assert.throws(() => avow.ok(false))
  assert.throws(() => avow.strictEqual(1, 2))
  assert.throws(() => avow.throws(() => null))
})

test('Object thrown', t => {
  const customError = Object.assign(Error('customError'), { myField: 'myKey' })

  try { avow(false, customError) }
  catch (e) {
    assert.notEqual(e.name, 'AssertionError')
    assert.deepStrictEqual(e, customError)
    return
  }
  throw Error('Should have thrown')
})

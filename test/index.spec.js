'use strict'

const test = require('ava')
const assert = require('assert')

const presume = require('../')

test('Compatible behavior with assert', t => {
  presume(true)
  presume.ok(true)
  presume.deepEqual({ a: 1 }, { a: '1' })
  presume.deepStrictEqual({ a: 1 }, { a: 1 })
  presume.doesNotThrow(() => null)
  presume.equal(1, '1')
  presume.ifError()
  presume.notDeepEqual({ a: 2 }, { a: '1' })
  presume.notDeepStrictEqual({ a: 1 }, { a: '1' })
  presume.notEqual(1, 2)
  presume.notStrictEqual(1, '1')
  presume.ok(true)
  presume.strictEqual(1, 1)
  presume.throws(() => { throw Error() })

  assert.throws(() => presume.fail(1, 2, undefined, '>'))
  assert.throws(() => presume(false))
  assert.throws(() => presume.ok(false))
  assert.throws(() => presume.deepEqual({ a: 1 }, { a: 2 }))
  assert.throws(() => presume.deepStrictEqual({ a: 1 }, { a: '1' }))
  assert.throws(() => presume.doesNotThrow(() => { throw Error() }))
  assert.throws(() => presume.equal(1, 2))
  assert.throws(() => presume.ifError(true))
  assert.throws(() => presume.notDeepEqual({ a: 2 }, { a: '2' }))
  assert.throws(() => presume.notDeepStrictEqual({ a: 1 }, { a: 1 }))
  assert.throws(() => presume.notEqual(1, 1))
  assert.throws(() => presume.notStrictEqual(1, 1))
  assert.throws(() => presume.ok(false))
  assert.throws(() => presume.strictEqual(1, 2))
  assert.throws(() => presume.throws(() => null))
})

test('Object thrown', t => {
  const customError = Object.assign(Error('customError'), { myField: 'myKey' })

  try { presume(false, customError) }
  catch (e) {
    assert.notEqual(e.name, 'AssertionError')
    assert.deepStrictEqual(e, customError)
    return
  }
  throw Error('Should have thrown')
})

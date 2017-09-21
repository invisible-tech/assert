'use strict'

const test = require('ava')
const assert = require('assert')

const invisibleAssert = require('../')

test('Compatible behavior with assert', t => {
  invisibleAssert(true)
  invisibleAssert.ok(true)
  invisibleAssert.deepEqual({ a: 1 }, { a: '1' })
  invisibleAssert.deepStrictEqual({ a: 1 }, { a: 1 })
  invisibleAssert.doesNotThrow(() => null)
  invisibleAssert.equal(1, '1')
  invisibleAssert.ifError()
  invisibleAssert.notDeepEqual({ a: 2 }, { a: '1' })
  invisibleAssert.notDeepStrictEqual({ a: 1 }, { a: '1' })
  invisibleAssert.notEqual(1, 2)
  invisibleAssert.notStrictEqual(1, '1')
  invisibleAssert.ok(true)
  invisibleAssert.strictEqual(1, 1)
  invisibleAssert.throws(() => { throw Error() })

  assert.throws(() => invisibleAssert.fail(1, 2, undefined, '>'))
  assert.throws(() => invisibleAssert(false))
  assert.throws(() => invisibleAssert.ok(false))
  assert.throws(() => invisibleAssert.deepEqual({ a: 1 }, { a: 2 }))
  assert.throws(() => invisibleAssert.deepStrictEqual({ a: 1 }, { a: '1' }))
  assert.throws(() => invisibleAssert.doesNotThrow(() => { throw Error() }))
  assert.throws(() => invisibleAssert.equal(1, 2))
  assert.throws(() => invisibleAssert.ifError(true))
  assert.throws(() => invisibleAssert.notDeepEqual({ a: 2 }, { a: '2' }))
  assert.throws(() => invisibleAssert.notDeepStrictEqual({ a: 1 }, { a: 1 }))
  assert.throws(() => invisibleAssert.notEqual(1, 1))
  assert.throws(() => invisibleAssert.notStrictEqual(1, 1))
  assert.throws(() => invisibleAssert.ok(false))
  assert.throws(() => invisibleAssert.strictEqual(1, 2))
  assert.throws(() => invisibleAssert.throws(() => null))
  t.pass()
})

test('Custom error objects', t => {
  const customError = Object.assign(Error('customError'), { myField: 'myKey' })

  try { invisibleAssert(false, customError) }
  catch (e) {
    assert.notEqual(e.name, 'AssertionError')
    assert.deepStrictEqual(e, customError)
    return t.pass()
  }
  t.fail()
})

test('POJO as message', t => {
  const pojo = { key: 'value' }
  try { invisibleAssert(false, pojo) }
  catch (e) {
    assert.deepStrictEqual(e, pojo)
    return t.pass()
  }
  t.fail()
})

test('assert without message', t => {
  const pojo = { key: 'value' }
  const dummy = { dummy: 'dummy' }
  try { invisibleAssert.deepStrictEqual(dummy, pojo) }
  catch (e) {
    assert(e instanceof assert.AssertionError)
    return t.pass()
  }
  t.fail()
})

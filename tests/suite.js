//////////////////////////////////////////////////////////////////////////////
// Unit tests for the `boo' module.

boo     = require('../src/boo')
extend  = boo.extend
merge   = boo.merge
clone   = boo.clone

keys  = Object.keys
proto = Object.getPrototypeOf

require('claire')
test = claire.test


//// SETUP ///////////////////////////////////////////////////////////////////
A = { a: [1]
    , _to_data: function() {
          return { a: [3] }}}

B = { b: 1 }

C = clone(A, B)

D = merge(A, B)

E = { c: 2 }

F = extend({ b: 2 }, [A, B, clone(E)])

test('extend', function() {
    assert(F.b <eq> 1)
    assert(F.a <eq> [3])
    refute('c' in F)
})

test('merge', function() {
    assert(proto(D) === Object.prototype)
    assert(D.a <eq> [3])
    assert(D.b <eq> 1)
    refute(D === A)
})

test('clone', function() {
    assert(proto(C) === A)
    assert(C.a <eq> [1])
    assert('_to_data' in C)
    assert(C.b <eq> 1)
})

// Run the test cases
claire.run()

//////////////////////////////////////////////////////////////////////////////
// Unit tests for the `boo' module.

boo   = require('../src/boo')
extend  = boo.extend
merge   = boo.merge
clone   = boo.clone
compose = boo.compose
resolve = boo.resolve

keys  = Object.keys
proto = Object.getPrototypeOf

require('claire')
test = claire.test


//// SETUP ///////////////////////////////////////////////////////////////////
A = { a: [1]
    , __clone__: function() {
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
    assert('__clone__' in C)
    assert(C.b <eq> 1)
})

test('compose', function() {
    try {
        compose({}, B, { b: 3 })
        assert(false)
    } catch (e) {
        assert('"b" already exists.' <eq> e.message)
    }

    assert(proto(compose(B, A)) === B)
    assert(compose(B, A).a <eq> [3])
})

test('resolve', function() {
    var o = { a: 1, b: 2, c: 3 }
    var o1 = resolve({ bar: 1 }, { prefix: 'boo'
                                 , map: function(key) { return 'FOO' + key.toUpperCase() }})
    function cp(key){ return key === 'c' }

    assert('foo_bar' in resolve({ bar: 1 }, { prefix: 'foo_' }))
    assert('FOOBAR' in o1)
    assert(keys(resolve(o, { only: /a|b/ })) <eq> ['a', 'b'])

    assert(keys(resolve(o, { only: ['a'] })) <eq> ['a'])
    assert(keys(resolve(o, { only: cp }))    <eq> ['c'])

    assert(keys(resolve(o, { exclude: /a|b/ })) <eq> ['c'])
    assert(keys(resolve(o, { exclude: ['a'] })) <eq> ['b', 'c'])
    assert(keys(resolve(o, { exclude: cp }))    <eq> ['a', 'b'])

    assert(keys(resolve(o, { only: /a|b/, exclude: ['a'] })) <eq> ['b'])
})

// Run the test cases
claire.run()

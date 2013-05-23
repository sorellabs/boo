var spec   = require('brofist')()
var assert = require('assert')
var boo    = require('../../')

module.exports = spec('Module: boo', function(it, spec) {
  spec('extend()', function(it) {
    it('Should modify the first argument.', function() {
      var x = {}
      boo.extend(x, { a: 1 })
      assert(x.a == 1)
    })

    it('Should use right-most precedence.', function() {
      var x = { a: 1 }
      boo.extend(x, { b: 1 }, { a: 2 }, { c: 3, b: 3 })
      assert(x.a == 2)
      assert(x.b == 3)
      assert(x.c == 3)
    })

    it('Should clone mixins using the .toData() method.', function() {
      var x = {}
      var y = { data: [], toData: function(){ return { data: [] }}}

      boo.extend(x, y)
      x.data.push(1)

      assert(y.data.length == 0)
      assert(x.data.length == 1)
      assert(x.data[0] == 1)
    })
  })

  spec('merge()', function(it) {
    it('Should merge all mixins in one object.', function() {
      var x = { a: 1 }
      var y = { b: 2 }
      var z = { a: 3 }
      var a = boo.merge(x, y, z)

      assert(a.a == 3)
      assert(a.b == 2)
    })

    it('Should not modify any mixins.', function() {
      var x = { a: 1 }
      var y = { b: 2 }
      var z = { a: 3 }
      var a = boo.merge(x, y, z)

      assert(x.a == 1)
      assert(y.b == 2)
      assert(z.a == 3)
    })
  })

  spec('derive()', function(it) {
    it('Should make a new object, inheriting from proto.', function() {
      var foo = { a: 1 }
      var bar = boo.derive(foo)
      assert(foo.isPrototypeOf(bar))
    })

    it('Should extend the new object with the given mixins.', function() {
      var foo = { a: 1 }
      var bar = boo.derive(foo, { b: 2, c: 3, a: 4 })

      assert(!('b' in foo))
      assert(!('c' in foo))

      assert(foo.a == 1)
      assert(bar.a == 4)
      assert(bar.b == 2)
      assert(bar.c == 3)
    })
  })

  spec('Object: base', function(it, spec) {
    spec('make()', function(it) {
      it('Should clone `this`.', function() {
        var x = boo.Base.make()
        assert(boo.Base.isPrototypeOf(x))
      })

      it('Should apply the `init` method, if present.', function() {
        var y = boo.Base.derive({ init: function(n){ this.a = n }})
        var z = y.make(3)

        assert(z.a == 3)
      })
    })

    spec('derive()', function(it) {
      it('Should derive from `this`.', function() {
        var bar = boo.Base.derive()
        assert(boo.Base.isPrototypeOf(bar))
      })

      it('Should extend the new object with the given mixins.', function() {
        var bar = boo.Base.derive({ a: 2 }, { b: 3 }, { c: 4 })

        assert(bar.a == 2)
        assert(bar.b == 3)
        assert(bar.c == 4)
      })
    })
  })
})

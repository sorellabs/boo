var boo = require('../src/boo')

describe('Module: boo', function() {

  describe('extend', function() {
    it('- Should modify the first argument', function() {
      var x = {}
      boo.extend(x, {a: 1})
      x.a.should.equal(1) })

    it('- Should use right-most precedence', function() {
      var x = {a:1}
      boo.extend(x, {b:1}, {a:2}, {c:3, b:3})
      x.a.should.equal(2)
      x.b.should.equal(3)
      x.c.should.equal(3) })

    it('- Should clone mixins using the #to_data method', function() {
      var x = {}
      var y = {data:[], to_data:function(){ return { data:[] }}}
      boo.extend(x, y)
      x.data.push(1)
      y.data.should.be.empty
      x.data.length.should.equal(1)
      x.data[0].should.equal(1) })
  })

  describe('merge', function() {
    it('- Should return merge all mixins in one object', function() {
      var x = {a: 1}
      var y = {b: 2}
      var z = {a: 3}
      var a = boo.merge(x, y, z)
      a.a.should.equal(3)
      a.b.should.equal(2)
    })
    it('- Should not modify any mixins', function() {
      var x = {a: 1}
      var y = {b: 2}
      var z = {a: 3}
      var a = boo.merge(x, y, z)
      x.a.should.equal(1)
      y.b.should.equal(2)
      z.a.should.equal(3)
    })
  })

  describe('derive', function() {
    it('- Should make a new object inheriting from proto', function() {
      var foo = {a:1}
      var bar = boo.derive(foo, {a:2})
      bar.a.should.equal(2)
      foo.isPrototypeOf(bar).should.be.true })

    it('- Should extend the new object with the given mixins', function() {
      var foo = {a:1}
      var bar = boo.derive(foo, {b:2, c:3, a:4})
      foo.should.not.have.property('b')
      foo.should.not.have.property('c')
      foo.a.should.equal(1)
      bar.a.should.equal(4)
      bar.b.should.equal(2)
      bar.c.should.equal(3) })
  })

  describe('Object: Base', function() {
    describe('make', function() {
      it('- Should clone `this`', function() {
        var x = boo.Base.make()
        boo.Base.isPrototypeOf(x).should.be.true })

      it('- Should apply the `init` method, if present', function(){
        var y = boo.Base.derive({init:function(n){ this.a = n }})
        var z = y.make(3)
        z.a.should.equal(3) })
    })

    describe('derive', function() {
      it('- Should derive from `this`', function(){
        var bar = boo.Base.derive({a:2})
        boo.Base.isPrototypeOf(bar).should.be.true })

      it('- Should extend the new object with the gven mixins', function() {
        var bar = boo.Base.derive({a:2}, {b:3}, {c:4})
        bar.a.should.equal(2)
        bar.b.should.equal(3)
        bar.c.should.equal(4) })
    })
  })
})
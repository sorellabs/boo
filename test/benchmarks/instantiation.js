/// instantiation --- Instantiation-related benchmarks.
//
// Copyright (c) 2011 The Orphoundation
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var Benchmark = require('benchmark')
var boo       = require('../../src/boo')
var suite     = new Benchmark.Suite
var x

// -- Boo ---------------------------------------------------------------------
var Animal = boo.Base.derive({
  init:
  function(name) {
    this.name = name }
})

var Cat = Animal.derive({
  init:
  function(name, colour) {
    Animal.init.call(this)
    this.colour = colour }
})

suite.add('λ Base#make', function() {
  x = Cat.make('Nyah', 'rainbow-coloured')
})

suite.add('λ make (generic)', function() {
  x = boo.make(Cat, 'Nyah', 'rainbow-coloured') })

// -- Native ------------------------------------------------------------------
function nAnimal(name) {
  this.name = name }

nCat.prototype = Object.create(nAnimal.prototype)
function nCat(name, colour) {
  nAnimal.call(this, name)
  this.colour = colour }

suite.add('Native ‹new›', function() {
  x = new nCat('Nyah', 'rainbow-coloured')
})

// -- __proto__ ---------------------------------------------------------------
suite.add('Native ‹__proto__›', function() {
  x = nCat.call({ __proto__: nCat.prototype }, 'Nyah', 'rainbow-coloured') })


// ============================================================================
module.exports = { name: 'Instantiation'
                 , code: suite }

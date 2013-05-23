var Benchmark = require('benchmark')
var boo       = require('../../')
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
    Animal.init.call(this, name)
    this.colour = colour }
})

suite.add('λ Base#make', function() {
  x = Cat.make('Nyah', 'rainbow-coloured')
})

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

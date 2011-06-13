//////////////////////////////////////////////////////////////////////////////
// Unit tests for the `boo' module.

boo   = require('../src/boo')
upper   = boo.upper
inherit = boo.inherit
extend  = boo.extend
can     = boo.can
plugin  = boo.plugin

require('../vendor/claire/lib/claire')
test = claire.test


//// SETUP ///////////////////////////////////////////////////////////////////
function Mage(name) {
	this.name = name
}
Mage.prototype.cast = function(spell, can) {
	if (can) return this.name + " cast " + spell
	else     return "Nothing happens!"
}
Mage.prototype.meditate = function() {
	return "You start meditatin... zzz"
}


inherit(Apprentice, Mage.prototype)
function Apprentice(name) {
	upper(this, "constructor", name)
}
Apprentice.prototype.cast = function(spell, can) {
	return upper(this, "cast", spell, can || Math.random() < 0.5)
}


inherit(Sorcerer, Apprentice.prototype)
function Sorcerer(name) {
	upper(this, "constructor", "Mighty " + name)
}
Sorcerer.prototype.cast = function(spell) {
	return upper(this, "cast", spell, true)
}
Sorcerer.prototype.meditate = function() {
	return "...Your magic has increased!"
}

///// TRAITS /////////////////////////////////////////////////////////////////
BlackMage = {
	agi:  function(){ return this.cast("Agi", true)  },
	bufu: function(){ return this.cast("Bufu", true) }
}
WhiteMage = {
	dia:   function(){ return this.cast("Dia", true) },
	patra: function(){ return this.cast("Patra", true) }
}
Necromancer = {
	mudo: function(){ return this.cast("Mudo", true) }
}


//// EXPORT STUFF ////////////////////////////////////////////////////////////
var root        = (typeof global != "undefined") ? global : window
root.Mage       = Mage
root.Apprentice = Apprentice
root.Sorcerer   = Sorcerer


///// TESTS //////////////////////////////////////////////////////////////////
test("Inheritance [inherit]", function() {
	assert(new Mage       instanceof Mage)
	assert(new Apprentice instanceof Mage)
	assert(new Apprentice instanceof Apprentice)
	assert(new Sorcerer   instanceof Mage)
	assert(new Sorcerer   instanceof Apprentice)
	assert(new Sorcerer   instanceof Sorcerer)

	assert(Apprentice.prototype.$super === Mage.prototype)
	assert(Sorcerer.prototype.$super   === Apprentice.prototype)
})

test("Extension [extend]", function() {
	var foo = {bar: 1}
	var bar = {baz: 2}
	var baz = {lol: 3}

	extend(foo, bar)
	assert(foo.bar <eq> 1)
	assert(foo.baz <eq> 2)
	
	extend(foo, bar, baz)
	assert(foo.lol <eq> 3)
})

test("Functionality checks [can]", function() {
	var x = new Sorcerer, y = new Apprentice, z = new Mage

	assert(can(x, "cast")     === Apprentice.prototype)

	assert(can(y, "cast")     === Mage.prototype)
	assert(can(x, "meditate") === Mage.prototype)
	assert(can(y, "meditate") === Mage.prototype)
})

test("Supper calls [upper]", function() {
	var m = new Apprentice("Mako")
	  , v = new Sorcerer("Vivi")

	assert(upper(m, "cast", "fire", false) == "Nothing happens!")
	assert(upper(m, "cast", "fire", true)  == "Mako cast fire")
	assert(m.meditate()                    == "You start meditatin... zzz")
	
	assert(v.cast("fire") == "Mighty Vivi cast fire")
})

test("Traits [plugin]", function() {
	var m = new Apprentice("Mako")
	  , v = new Sorcerer("Vivi")

	// Now Vivi is a black mage~
	plugin(v, BlackMage)
	assert(v.agi()   == "Mighty Vivi cast Agi")
	assert(v.bufu()  == "Mighty Vivi cast Bufu")

	// Now Mako is a white mage~ (and Vivi too, as a side-effect)
	plugin(Apprentice, WhiteMage)
	assert(m.dia()   == "Mako cast Dia")
	assert(m.patra() == "Mako cast Patra")
	assert(v.dia()   == "Mighty Vivi cast Dia")
	assert(v.patra() == "Mighty Vivi cast Patra")

	// And everyone gets necromancy magic
	plugin(Mage, Necromancer)
	assert(m.mudo()  == "Mako cast Mudo")
	assert(v.mudo()  == "Mighty Vivi cast Mudo")
})


// Run the test cases...
claire.run()

//////////////////////////////////////////////////////////////////////////////
// Unit tests for the `proto' module.

proto   = require('../src/proto')
upper   = proto.upper
inherit = proto.inherit

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
Apprentice.prototype.cast = function(spell) {
	upper(this, "cast", spell, Math.random() < 0.5)
}


inherit(Sorcerer, Apprentice.prototype)
function Sorcerer(name) {
	upper(this, "constructor", "Mighty " + name)
}
Sorcerer.prototype.cast = function(spell) {
	upper(this, "cast", spell, true)
}
Sorcerer.prototype.meditate = function() {
	return "...Your magic has increased!"
}

///// TRAITS /////////////////////////////////////////////////////////////////
BlackMage = {
	agi:  function(){ this.cast("Agi")  },
	bufu: function(){ this.cast("Bufu") }
}
WhiteMage = {
	dia:   function(){ this.cast("Dia") },
	patra: function(){ this.cast("Patra") }
}
Necromancer = {
	mudo: function(){ this.cast("Mudo") }
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

	assert(Apprentice.prototype.__super__ === Mage.prototype)
	assert(Sorcerer.prototype.__super__   === Apprentice.prototype)
})


// Run the test cases...
claire.run()
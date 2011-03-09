//////////////////////////////////////////////////////////////////////////////
// Unit tests for the `proto' module.
//

proto  = require('../src/proto')

require('../vendor/claire/lib/claire')
test = claire.test

Animal = function(name) {
	this.name = name
}
Animal.prototype.words = function(){}
Animal.prototype.say   = function(){
	return this.name + ": " + this.words()
}

Cat = function(name, gender) {
	proto.upper(this, "constructor", name)
	this.gender = gender
}
proto.inherit(Cat, Animal.prototype,
	{ words: function(){ return "Nyah~!" } })

LOLCat = function(name) {
	proto.upper(this, "constructor", name, "LOL")
}
proto.inherit(LOLCat, Cat.prototype,
	{ words: function() { return "LOL HAI WORLD KTHXBYE" }})



test("Function `inherit'", function() {
	assert(new Cat instanceof Animal)
	assert(new LOLCat instanceof Cat)
	assert(new LOLCat instanceof Animal)

	var kitten = new Cat("Marie")
	assert(kitten.say() <eq> "Marie: Nyah~!")
}) 

test("Function `can'", function() {
	var kitten = new Cat("Marie")
	var lolq   = new LOLCat()

	assert(proto.can(kitten, "say") === Animal.prototype)
	assert(proto.can(lolq, "say") === Animal.prototype)
	assert(proto.can(kitten, "constructor") === Animal.prototype)
	assert(proto.can(lolq, "constructor") === Cat.prototype)

	console.log(proto.can(kitten, "constructor"))
})

test("Function `upper'", function() {
	var kitten = new Cat("Marie", "female")
	var lolq   = new LOLCat("lolidunno")

	assert(kitten.name   <eq> "Marie")
	assert(kitten.gender <eq> "female")
	assert(lolq.name     <eq> "lolidunno")
	assert(lolq.gender   <eq> "LOL")
})

claire.run()
	
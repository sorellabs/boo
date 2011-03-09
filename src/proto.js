/*****************************************************************************
 *                              ~b.one.proto~                                *
 *                            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                              *
 * Provides prototypal utilities for inheritance, including a very basic     *
 * traits system.                                                            *
 *                                                                           *
 *     ________________________________________________________________      *
 *       Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 *****************************************************************************/


//// The `proto` module //////////////////////////////////////////////////////
//
// The goal is to provide a handier prototypal inheritance structure for
// JavaScript programs, by adding new functions to deal with the usual
// pattern in an abstract way, as well as introducing a new system to
// deal with *multiple-inheritance* — traits.
//
// Note that the Traits system implemented by this library is not the
// same as the one in Self: prototype inheritance in JavaScript is
// one->one. Thus, this system is, in fact, closer to `mixins` than
// actual Traits. With the exception that these `traits` are burned in
// the object's prototype rather than directly in the object itself.


//// Objects and inheritance /////////////////////////////////////////////////
//
// There are a handful of problems with the way JavaScript handles
// inheritance out of the box. And I'm not talking about being
// Prototypal — since that's one of the best things about it.
//
// For one, you can't inherit directly from other objects. ES5
// introduced Object.create, but it's not available everywhere.
//
// There's no `extend` function built-in, which means that once you've
// set the prototype for a constructor, you have to manually set all of
// the functions too. This also means you don't get to extend the
// prototype with other objects very nicely (out of the box, of
// course).
//
// Calling `super` methods requires hard-coded parents, which doesn't
// work when you have things like traits extended directly on the
// prototype. Capatibilities of parents aren't implemented either —
// testing which one implements which attributes.
//
// To solve this, the module provides three new functions: `inherit`,
// `upper` and `can`, which are discussed in more detail below.


(function (root) {
	// Makes sure the base framework object is defined
	if (!root.b) root.b = {}

	// Some alias for rather JavaLongCommandNamesAndIReallyMeanLong.
	var mod    = (typeof exports == "undefined") ? root.b.proto = {}
	                                             : exports
	  , proto  = Object.getPrototypeOf
	  , create = Object.create
	  , slice  = Array.prototype.slice



	///// Function `inherit` /////////////////////////////////////////////////
	//
	//     inherit(Fun:ctor, Obj:base[, Obj:props]) → Fun:ctor
	//
	// Takes a constructor and a base object, and sets the prototype in
	// the constructor without breaking `instanceof`.
	//
	// If an additional object is passed (as `props`), the properties
	// defined in that object will be copied into the prototype of the
	// constructor as well.
	//
	// Note that these *additional properties* won't have a special
	// inheritance relationship with the constructor's prototype. In
	// fact, they **will** be treated as just being the constructor's
	// own prototype properties.
	//
	function inherit(ctor, base, props) {
		/*** IFDEF DEBUG
		 assert(base, "Missing `base' parameter")
		 assert(dbg.isfn(ctor), "`ctor' isn't a function")
		 *** ENDIF */

		props.constructor = ctor
		props.__super__   = base
		ctor.prototype    = create(base)
		return extend(ctor.prototype, props)
	}


	///// Function `extend' //////////////////////////////////////////////////
	//
	//    extend(Obj:obj, Obj:sources...) → Obj:obj
	//
	// Copies the given source's **own** properties in `obj', and returns
	// the object.
	//
	// > Note that this is only a **shallow** copy, anything other than
	// > primitives will be copied just as a reference to the original
	// > object.
	//
	function extend(obj) {
		var sources = slice.call(arguments, 1)
		  , src, prop

		while ((src = sources.shift())) {
			for (prop in src)
				if (src.hasOwnProperty(prop)) obj[prop] = src[prop] }

		return obj
	}



	///// Function `can` /////////////////////////////////////////////////////
	//
	//     can(Obj:obj, Str:attr[, Bool:allow_traits=true]) → Obj
	//
	// Searches which of the parents of the given objects implement the
	// attribute, and returns it.
	//
	// Sometimes you want to know which object is capable of doing
	// something, and most of the times a simple `in` check will be
	// enough. For those times where you want to check which of the
	// **ancestors** of an object implement a certain functionality (for
	// calling a `super` method, for example), you have this method.
	//
	// By default, this function will search any of the objects that
	// provides the requested functionality for the base object —
	// traits included.
	//
	// The prototype is searched first, then, if the functionality is
	// not found, we move on to searching the trait list, in the reverse
	// order they were plugged in.
	//
	// If the method is not found in the immediate accessors, the
	// function will keep searching up the prototype chain to try to
	// find the requested functionality. And if it really can't find the
	// attribute, `null` is returned.
	//
	// > Note that the trait's prototypes and the object itself are
	// > **not** included in this search chain.
	//
	function can(obj, attr, allow_traits) {
		/*** IFDEF DEBUG
		 assert(dbg.isobj(obj), "`obj' is not an object")
		 assert(attr, "Missing `attr' parameter")
		 *** ENDIF */
		function add_traits(){ bases.push.apply(bases, obj.__traits__ || []) }
		function get_base()  { return cur.__super__ || cur                   }
		function has_attr()  { return cur && cur.hasOwnProperty(attr)        } 

		var bases, cur
		if (allow_traits == null) allow_traits = true

		while (obj) {
			// Build a list of all the immediate accessors we should
			// look at
			bases = [proto(obj)]
			if (allow_traits) add_traits()

			// Then check each one, in order, to see if they have the
			// requested property
			while (bases.length) {
				cur = bases.shift()
				if (has_attr()) return get_base() }

			// If none of them does, continue on to the next accessors
			obj = proto(obj) }
	}



	///// Function `upper` ///////////////////////////////////////////////////
	//
	//     upper(Obj:obj[, Obj:base][, Str:meth][, args...]) → ?
	//
	// Calls a parent method in the context of the given object.
	//
	// This allows for fully prototypal inheritance, without loosing
	// overwritten methods. Because, you see, we assume that methods
	// that were overwritten are somehow **important** and you will want
	// to refer to them on your functions.
	//
	// The given method will **always** be searched on all of the
	// accessors, traits included, and it'll be called in the context of
	// the given object.
	//
	// To avoid errors with *endless recursion*, the super call state
	// (the object that was looked upon last time) is saved on each
	// call, and removed when the function returns.
	//
	// This is done by simple writing to the `__$ctx__` property, and
	// expects your function to be **synchronous**. If you're calling
	// any asynchronous super method, you'll need to pass the previous
	// stored context explicitly.
	//
	//     b.one.proto.upper(this, this.__$ctx__, "show")
	//
	// > Note that this assumes you won't be writing to `__$ctx__` in
	// > your code. As a rule of thumb, you shouldn't ever have an
	// > actual property with a dollar sign anyways.
	//
	function upper(obj) {
		// Sanitize the arguments passed to the function
		var args = slice.call(arguments, 1)
		  , base = args.shift()
		  , meth

		if (Object(base) !== base) meth = base, base = null
		else                       meth = args.shift()

		if (!base)                 base = obj.__$ctx__ || obj

		return __upper(obj, base, meth, args)
	}

	function __upper(obj, base, meth, args) {
		var _super

		// try to find the first accessor to implement the method, then
		// return the result of calling this method.
		_super       = can(base, meth)
		obj.__$ctx__ = _super

		if (_super) return _super[meth].apply(obj, args)
	}



	///// Exports ////////////////////////////////////////////////////////////
	mod.inherit = inherit
	mod.extend  = extend
	mod.can     = can
	mod.upper   = upper
})(this);

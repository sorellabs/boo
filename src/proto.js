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
	var mod    = root.b.proto = {}
	  , proto  = Object.getPrototypeOf
	  , create = Object.create


})(this);

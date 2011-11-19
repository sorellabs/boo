/// boo.js --- Prototypical utilities for Object Orientation / Composition
//
// Copyright (c) 2011 Quildreen Motta
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

/// Module boo
void function (root, exports_p) {

  var slice   = [].slice
    , keys    = Object.keys
    , inherit = Object.create
    , proto   = Object.getPrototypeOf



  //// -Interface testing

  ///// Function obj_p
  // Checks if something is an object, as opposed to a primitive.
  //
  // Obj :: Any → Bool
  function obj_p(subject) {
    return Object(subject) === subject }

  ///// Function data_obj_p
  // Checks if an object implements a mixin factory.
  //
  // A data-object is any object that implements the special
  // ``toData`` method, which is called without arguments
  // and is expected to return an object.
  //
  // DataObj :: Obj → Bool
  function data_obj_p(subject) {
    return obj_p(subject)
        && typeof subject.toData == 'function' }

  ///// Function callable_p
  // Checks if the object can be called directly.
  //
  // Callable :: Obj → Bool
  function callable_p(subject) {
    return typeof subject == 'function' }



  //// -Object Orientation Utilities

  ///// Function extend
  // Copies all *own enumerable* properties from the mixin list over to
  // the target ``object``.
  //
  // The copying is done in order, from left to right, using right-most
  // priority — that is, if there's a property conflict, the property
  // defined in the last mixin is used.
  //
  // Data-objects will be handled accordingly, by allowing them to
  // return a new instance with the properties that should be copied.
  //
  // :warning: side-effects
  //    The function will modify ``object`` in-place.
  //
  // extend :: Obj, [Obj] → Obj
  function extend(object, mixins) { var i, j, key, len, mixin, props
    for (i = 0, len = mixins.length; i < len; ++i) {
      mixin = data_obj_p(mixins[i])?  mixins[i].toData()
                                   :  mixins[i]
      props = keys(mixin)
      for (j = props.length; j--;) {
        key         = props[j]
        object[key] = mixin[key] }}

    return object }

  ///// Function merge
  // Merges all the given mixins into a single, fresh object.
  //
  // This constructs an entirely new mixin — so, no parent here — by
  // doing a set-union with all the given mixins. Semantics are the same
  // as {:fn:extend}.
  //
  // merge :: Obj... → Obj
  function merge() {
    return extend({}, arguments) }

  ///// Function clone
  // Creates a new object, inheriting from the given ``[[Prototype]]``.
  //
  // The resulting fresh object is also extended with the provided
  // mixins, if any, from left to right — where properties at right
  // have higher precedence.
  //
  // clone :: Obj, Obj... → Obj
  function clone(proto) {
    return extend(inherit(proto), slice.call(arguments, 1)) }

  //// Function proto
  // Returns the ``[[Prototype]]`` of the given object.
  //
  // proto :: Obj → Obj
  // :alias: Object.getPrototypeOf


  //// -Basic objects

  ///// Object Base
  var Base = {
    ////// Function make
    // Creates a new instance of the object, initialising it if the
    // object provides an ``init`` method.
    //
    // make :: Any... → Obj
    make:
    function make() { var result
      result = inherit(this)
      if (callable_p(result.init))
        result.init.apply(result, slice.call(arguments))

      return result },

    ////// Function clone
    // Creates a new object inheriting from this one, and optionally
    // extending it with additonal objects.
    //
    // clone :: Obj... → Obj
    clone:
    function clone() {
      return extend(inherit(this), arguments) }
  }



  //// -Exports
  var old, boo

  if (!exports_p) {
    old = root.boo
    boo = root.boo = {}

    //// Function make_local
    // Removes ``boo`` from the global object.
    //
    // make-local :: → boo
    boo.make_local = function() {
      root.boo = old
      return boo }}
  else
    boo = exports


  boo.extend  = extend
  boo.merge   = merge
  boo.clone   = clone
  boo.proto   = proto
  boo.Base    = Base

  boo.internal = { data_obj_p: data_obj_p
                 , callable_p: callable_p }

// --
}
( this
, typeof exports != 'undefined'
)
// -- boo.js ends here --
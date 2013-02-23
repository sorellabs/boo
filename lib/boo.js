/// Module boo /////////////////////////////////////////////////////////
//
// Base primitives for prototypical OO.
//
//
// Copyright (c) 2011 Quildreen "Sorella" Motta <quildreen@gmail.com>
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

void function(root, exports) {

  //// -- Aliases ------------------------------------------------------
  var slice        = [].slice
  var keys         = Object.keys
  var inherit      = Object.create
  var define       = Object.defineProperty
  var descriptor   = Object.getOwnPropertyDescriptor
  var has_getter_p = function () {
                       try {
                         return true === Object.create( {}
                                                      , { x: { get:
                                                               function(){
                                                                 return true }}}).x }
                       catch(e){ return false }}()


  
  //// -- Interfaces ----------------------------------------------------------

  ///// type DataObject
  // :: { "to_data" -> () -> Object }

  ///// type Mixin
  // :: Object | DataObject


  
  //// -- Helpers -------------------------------------------------------------

  ///// λ copy_property
  // :internal:
  // Copies a property from `source` to `target`.
  //
  // :: Object, a:Object, String -> a
  function copy_property(source, target, property) {
    !has_getter_p?     target[property] = source[property]
    : /* otherwise */  define(target, property, descriptor(source, property))

    return target }

  ///// λ data_obj_p
  // :internal:
  // Checks if the given subject matches the `DataObject` interface
  //
  // :: a -> Bool
  function data_obj_p(subject) {
    return subject != null
    &&     typeof subject.to_data == 'function' }


  ///// λ resolve_mixins
  // :internal:
  // Returns the proper object for the given mixin.
  //
  // :: Mixin -> Object
  function resolve_mixin(subject) {
    return data_obj_p(subject)?  subject.to_data()
    :      /* otherwise */       subject }


  ///// λ fast_extend
  // :internal:
  // Extends the target object with the provided mixins, using a
  // right-most precedence rule — when a there's a property conflict, the
  // property defined in the last object wins.
  //
  // `DataObject`s are properly handled by the `resolve_mixin`
  // function.
  //
  // **warning:** low-level
  //
  // > This function is not meant to be called directly from end-user
  // > code, use the `extend` function instead.
  //
  // :: a:Object, [Mixin] -> a
  function fast_extend(object, mixins) {
    var i, j, len, mixin, props, key
    for (i = 0, len = mixins.length; i < len; ++i) {
      mixin = resolve_mixin(mixins[i])
      props = keys(mixin)
      for (j = props.length; j--;) {
        key         = props[j]
        copy_property(mixin, object, key) }}

    return object }


  
  //// -- Basic primitives ----------------------------------------------------

  ///// λ extend
  // Extends the target object with the provided mixins, using a
  // right-most precedence rule.
  //
  // ### See also
  //   - `fast_extend` — lower level function.
  //   - `merge`       — pure version.
  //
  // :: a:Object, Mixin... -> a
  function extend(target) {
    return fast_extend(target, slice.call(arguments, 1)) }


  ///// λ merge
  // Creates a new object that merges the provided mixins, using a
  // right-most precedence rule.
  //
  // ### See also
  //   - `extend` — impure version.
  //
  // :: Mixin... -> Object
  function merge() {
    return fast_extend({}, arguments) }


  ///// λ derive
  // Creates a new object inheriting from the given prototype and extends
  // the new instance with the provided mixins.
  //
  // :: a:Object, Mixin... -> a <| b
  function derive(proto) {
    return fast_extend(inherit(proto), slice.call(arguments, 1)) }


  ///// λ make
  // Constructs a new instance of the given object.
  //
  // If the object provides an `init` function, that function is
  // invoked to do initialisation on the new instance.
  //
  // :: a:Object, b... -> a <| c
  function make(base) {
    return Base.make.apply(base, slice.call(arguments, 1)) }


  
  //// -- Root object ---------------------------------------------------------

  ///// {} Base
  // Provides the previous primitive combinators in an easy and OOP-way.
  // :: Object <| Base
  var Base = {

    ////// λ make
    // Constructs new instances of the object the function is being
    // applied to.
    //
    // If the object provides an `init` function, that function is
    // invoked to do initialisation on the new instance.
    //
    // :: @this:Object, a... -> this <| b
    make:
    function _make() {
      var result = inherit(this)
      if (typeof result.init == 'function')
        result.init.apply(result, arguments)

      return result }

    ////// λ derive
    // Constructs a new object that inherits from the object this function
    // is being applied to, and extends it with the provided mixins.
    //
    // :: @this:Object, Mixin... -> this <| a
  , derive:
    function _derive() {
      return fast_extend(inherit(this), arguments) }}


  
  //// -- Exports -------------------------------------------------------------
  exports.extend   = extend
  exports.merge    = merge
  exports.derive   = derive
  exports.make     = make
  exports.Base     = Base
  exports.internal = { data_obj_p    : data_obj_p
                     , fast_extend   : fast_extend
                     , resolve_mixin : resolve_mixin
                     , copy_property : copy_property
                     }

}
( this
, typeof exports == 'undefined'?  this.boo = this.boo || {}
  /* otherwise, yay modules! */:  exports
)

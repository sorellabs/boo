// # Module boo
//
// Base primitives for prototypical OO.
//
//
// :licence: MIT
//   Copyright (c) 2011 Quildreen "Sorella" Motta <quildreen@gmail.com>
//
//   Permission is hereby granted, free of charge, to any person
//   obtaining a copy of this software and associated documentation files
//   (the "Software"), to deal in the Software without restriction,
//   including without limitation the rights to use, copy, modify, merge,
//   publish, distribute, sublicense, and/or sell copies of the Software,
//   and to permit persons to whom the Software is furnished to do so,
//   subject to the following conditions:
//
//   The above copyright notice and this permission notice shall be
//   included in all copies or substantial portions of the Software.
//
//   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//   NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//   LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//   OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
//   WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


// -- Aliases ----------------------------------------------------------
var slice      = Function.call.bind([].slice)
var keys       = Object.keys
var inherit    = Object.create
var define     = Object.defineProperty
var descriptor = Object.getOwnPropertyDescriptor
var hasGetter  = function () {
                   var getter = { get: function(){ return true } }
                   try {
                     return true === Object.create( {}
                                                  , { x: getter }).x }
                   catch(e){ return false }}()



// -- Interfaces -------------------------------------------------------

// ### Type data-object
// :: { toData: () -> object }

// ### Type mixin
// :: object | data-object



// -- Helpers ----------------------------------------------------------

// ### Function copyProperty
// :internal:
// Copies a property from `source` to `target`.
//
// :: A, B, string -> B
function copyProperty(source, target, property) {
  !hasGetter?        target[property] = source[property]
  : /* otherwise */  define(target, property, descriptor(source, property))

  return target }

// ### Function isDataObject
// :internal:
// Checks if the given subject matches the `DataObject` interface
//
// :: A -> bool
function isDataObject(subject) {
  return subject != null
  &&     typeof subject.toData == 'function' }


// ### Function resolveMixins
// :internal:
// Returns the proper object for the given mixin.
//
// :: mixin -> object
function resolveMixin(subject) {
  return isDataObject(subject)?  subject.toData()
  :      /* otherwise */         subject }


// ### Function fastExtend
// :internal:
// Extends the target object with the provided mixins, using a
// right-most precedence rule — when a there's a property conflict, the
// property defined in the last object wins.
//
// `DataObject`s are properly handled by the `resolveMixin`
// function.
//
// **warning:** low-level
//
// > This function is not meant to be called directly from end-user
// > code, use the `extend` function instead.
//
// :: object, [mixin] -> object
function fastExtend(object, mixins) {
  var i, j, len, mixin, props, key
  for (i = 0, len = mixins.length; i < len; ++i) {
    mixin = resolveMixin(mixins[i])
    props = keys(mixin)
    for (j = props.length; j--;) {
      key         = props[j]
      copyProperty(mixin, object, key) }}

  return object }



// -- Basic primitives -------------------------------------------------

// ### Function extend
// Extends the target object with the provided mixins, using a
// right-most precedence rule.
//
// See also:
//   - `fastExtend`  — lower level function.
//   - `merge`       — pure version.
//
// :: object, mixin... -> object
function extend(target) {
  return fastExtend(target, slice(arguments, 1)) }


// ### Function merge
// Creates a new object that merges the provided mixins, using a
// right-most precedence rule.
//
// See also:
//   - `extend` — impure version.
//
// :: mixin... -> object
function merge() {
  return fastExtend({}, arguments) }


// ### Function derive
// Creates a new object inheriting from the given prototype and extends
// the new instance with the provided mixins.
//
// :: object, mixin... -> object
function derive(proto) {
  return fastExtend(inherit(proto), slice(arguments, 1)) }



// -- Root object ------------------------------------------------------

// ### Object Base
//
// Provides the previous primitive combinators in an easy and OOP-way.
//
// :: object <| Base
var Base = {

  constructor: function(){ }

  // #### Function make
  // Constructs new instances of this object.
  //
  // :: @object => A... -> this <| object
, make:
  function make() {
    var instance = new this.constructor
    if (this.init)  this.init.apply(instance, arguments)
    return instance }

  // #### Function derive
  // Constructs a new object that inherits from the object this function
  // is being applied to, and extends it with the provided mixins.
  //
  // :: @object => mixin... -> this <| object
, derive:
  function _derive() {
    var instance = fastExtend(inherit(this), arguments)

    instance.constructor = function(){ }
    instance.constructor.prototype = instance
    return instance }}

Base.constructor.prototype = Base



// -- Exports ----------------------------------------------------------
module.exports = { extend : extend
                 , merge  : merge
                 , derive : derive
                 , Base   : Base }

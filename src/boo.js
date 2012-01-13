/// boo.js --- Prototypical utilities
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
void function(root, exports) {
  var slice   = [].slice
    , keys    = Object.keys
    , inherit = Object.create


  
  //// - Interfaces -----------------------------------------------------------

  ///// Interface DataObject
  // :: { "to_data" -> () -> Object }


  
  //// - Helpers --------------------------------------------------------------

  ///// Function data_obj_p
  // :internal:
  // Checks if the given subject matches the DataObject interface
  //
  // data_obj_p :: Any -> Bool
  function data_obj_p(subject) {
    return subject != null
    &&     typeof subject.to_data == 'function' }


  ///// Function resolve_mixins
  // :internal:
  // Returns the proper mixin for the given object.
  //
  // resolve_mixin :: Object -> Object
  function resolve_mixin(object) {
    return data_obj_p(object)?  object.to_data()
    :                           object }


  ///// Function fast_extend
  // :internal:
  // Extends the target object with the provided mixins, using a
  // right-most precedence rule — when a there's a property conflict, the
  // property defined in the last object wins.
  //
  // `DataObject's are properly handled by the `resolve_mixin'
  // function.
  //
  // :warning: low-level
  //    This function is not meant to be called directly from end-user
  //    code, use the `extend' function instead.
  //
  // fast_extend :: Object, [Object | DataObject] -> Object
  function fast_extend(object, mixins) {
    var i, j, len, mixin, props, key
    for (i = 0, len = mixins.length; i < len; ++i) {
      mixin = resolve_mixin(mixins[i])
      props = keys(mixin)
      for (j = props.length; j--;) {
        key         = props[j]
        object[key] = mixin[key] }}

    return object }


  
  //// - Basic primitives -----------------------------------------------------

  ///// Function extend
  // Extends the target object with the provided mixins, using a
  // right-most precedence rule.
  //
  // :see-also:
  //   - `fast_extend' — lower level function.
  //   - `merge'       — pure version.
  //
  // extend :: Object, (Object | DataObject)... -> Object
  function extend(target) {
    return fast_extend(target, slice.call(arguments, 1)) }


  ///// Function merge
  // Creates a new object that merges the provided mixins, using a
  // right-most precedence rule.
  //
  // :see-also:
  //   - `extend' — impure version.
  //
  // merge :: (Object | DataObject)... -> Object
  function merge() {
    return fast_extend({}, arguments) }

  ///// Function derive
  // Creates a new object inheriting from the given prototype and extends
  // the new instance with the provided mixins.
  //
  // derive :: Object, (Object | DataObject)... -> Object
  function derive(proto) {
    return fast_extend(inherit(proto), slice.call(arguments, 1)) }


  
  //// - Root object ----------------------------------------------------------

  ///// Object Base
  // The root object for basing all the OOP code. Provides the previous
  // primitive combinators in an easy and OOP-way.
  var Base = {

    ////// Function make
    // Constructs new instances of the object the function is being
    // applied to.
    //
    // If the object provides an ``init`` function, that function is
    // invoked to do initialisation on the new instance.
    //
    // make :: Any... -> Object
    make:
    function _make() {
      var result = inherit(this)
      if (typeof result.init == 'function')
        result.init.apply(result, arguments)

      return result }

    ////// Function derive
    // Constructs a new object that inherits from the object this function
    // is being applied to, and extends it with the provided mixins.
    //
    // derive :: (Object | DataObject)... -> Object
  , derive:
    function _derive() {
      return fast_extend(inherit(this), arguments) }}


  
  //// - Exports --------------------------------------------------------------
  exports.extend   = extend
  exports.merge    = merge
  exports.derive   = derive
  exports.Base     = Base
  exports.internal = { data_obj_p    : data_obj_p
                     , fast_extend   : fast_extend
                     , resolve_mixin : resolve_mixin
                     }

}
( this
, typeof exports == 'undefined'? this.boo = this.boo || {}
  /* otherwise, yay modules! */: exports
)
/// boo.js --- Prototypical utilities for Object Orientation / Composition
//
// Copyright (c) 2011 Quildreen Motta
//
// Version: 1.0.0
// Author:  Quildreen Motta <quildreen@gmail.com>
// URL:     http://github.com/killdream/boo
//
// Licensed under the permissive MIT/X11 licence.

/// -Installation
//
// Easy way, through =npm= in Node.js:
//
// :  $ npm install boo
// :  node> var boo = require('boo')
//
// Hard way, in Node.js:
//
// :  $ cd ~/path/to/project/node_modules
// :  $ git clone http://github.com/killdream/boo.git
// :  node> var boo = require('boo')
//
// Haado-modo, in the Browser:
//
// :  <script src="/path/to/boo.js"></script>


/// Module boo
//
// Boo provides utilities to structure a program by means of
// Prototypical OO and object composition, in an easy way.
//
// Mixins can be achieved by the use of the =extend= method, so to
// arbitrarily extend an object with properties from other objects, all
// one needs to do is:
//
// #+BEGIN_SRC js
//   var car = boo.extend(vehicle, steer
//                               , transmission
//                               , wheel)
// #+END_SRC
//
// There's also the =merge= method, for when the resulting object is
// just a mashup of all the objects passed as parameter, but you don't
// particularly want to modify any of those in-place.
//
// Basic prototypical inheritance can be achieved by the use of the
// =clone= method, which takes a parent and several positional mixins as
// arguments.
//
// #+BEGIN_SRC js
//   var car = boo.clone(vehicle, steer
//                              , transmission
//                              , wheel)
//
//   // This is equivalent to:
//   Object.extend = function(tgt, src) {
//     Object.keys(src).forEach(function(key) {
//       tgt[key] = src[key] })
//   }
//   var car = Object.create(vehicle)
//   Object.extend(car, steer)
//   Object.extend(car, transmission)
//   Object.extend(car, wheel)
// #+END_SRC
// 
// For object composition, boo provides some traits facilities. Traits
// ensure that none of the composed objects intersect — that is, no
// trait may provide a property with the same name in an object
// composition. Of course, boo also gives you tools to resolve the
// naming conflicts that might arise. Your tools here are =compose= and
// =resolve=.
//
// #+BEGIN_SRC js
//   // By default, wheels are put on the front-side, but we can
//   // make a copy that goes on the back-side (note that properties
//   // on the prototype are not resolved)
//   var front_wheel = wheel
//   var back_wheel  = boo.resolve(wheel, { map: { side: 'back'  }})
//   var car = boo.compose(vehicle, steer
//                                , transmission
//                                , front_wheel
//                                , back_wheel )
// #+END_SRC

void function (root, requirep, exportsp) {

  var slice  = [].slice
  , keys     = Object.keys
  , make_obj = Object.create
  , proto    = Object.getPrototypeOf



  //// -Error handling

  ///// Function key_collision_error
  // Throws an error signaling that a key collision happened when
  // doing trait composition.
  //
  // The property names will have to be manually resolved by the
  // programmer, by using the provided collision handling functions.
  //
  // :thows: Error
  // key-collision-error :: Str → Undefined
  function key_collision_error(key) {
    throw new Error('"' + key + '" already exists.')
  }



  //// -Interface testing

  ///// Function objp
  // Checks if something is an object, as opposed to a primitive.
  //
  // Obj :: Any → Bool
  function objp(subject) {
    return Object(subject) === subject
  }

  ///// Function clonablep
  // Checks if an object implements a clone factory.
  //
  // A clonable object is any object that implements the special
  // =__clone__= method. The clone method is called without arguments
  // and is expected to return an object.
  //
  // Clonable :: Obj → Bool
  function clonablep(subject) {
    return objp(subject)
        && typeof subject.__clone__ == 'function'
  }

  ///// Function callablep
  // Checks if the object can be called directly.
  //
  // Callable :: Obj → Bool
  function callablep(subject) {
    return typeof subject == 'function'
  }

  ///// Function testablep
  // Checks if the object implements at =test= function.
  //
  // Testable objects are expected to implement a =test= predicate
  // that takes a single argument, an Object, evaluates it and returns
  // whether it passed the test or not.
  //
  // Testable :: Obj → Bool
  function testablep(subject) {
    return objp(subject)
        && typeof subject.test == 'function'
  }



  //// -Object Orientation Utilities

  ///// Function extend
  // Copies all own enumerable properties from the mixins over to the
  // =object=.
  //
  // Only /own/ and /enumerable/ properties present on the =mixins=
  // will be carried over, this ensures that the function works the
  // same, even on environments that don't support ECMAScript 5
  // additions for inspecting properties.
  //
  // The copying is done in order, from left to right, with rightmost
  // priority such that if a mixin defines a property =foo=, and a
  // latter mixin also defines a property =foo=, the latter mixin's
  // property value will overwrite the previous value.
  //
  // If the mixin is =Clonable=, its =__clone__= method is expected
  // to be called with no arguments and return a new object. The
  // returned object will be copied over instead of the original
  // one. This allows the mixin to provide a way of initialising
  // properties that are not meant to be shared, for example, when
  // using the mixin as a data-parent.
  //
  // :warning: side-effects
  //    The function will modify the ~object~ in-place.
  //
  // extend :: Obj, [Obj] → Obj
  function extend(object, mixins) { var i, j, key, len, mixin, props
    for (i = 0, len = mixins.length; i < len; ++i) {
      mixin = clonablep(mixins[i])?  mixins[i].__clone__()
            :                        mixins[i]
      props = keys(mixin)
      for (j = props.length; j--;) {
        key         = props[j]
        object[key] = mixin[key] }}

    return object
  }

  ///// Function merge
  // Merges all the given mixins into a single, fresh object.
  //
  // This constructs an entirely new mixin — so, no parent here — by
  // doing a set-union with all the given mixins. Only the /own/ and
  // /enumerable/ properties are carried over to the resulting
  // object.
  //
  // :see-also:
  //    - [[fn:extend]] — The semantics on carrying properties over.
  //
  // merge :: Obj... → Obj
  function merge() {
    return extend({}, arguments)
  }

  ///// Function clone
  // Creates a new object, inheriting from the given =prototype=.
  //
  // The resulting fresh object is also extended with the provided
  // mixins, if any, from left to right — where properties at right
  // have higher precedence.
  //
  // :see-also:
  //    - [[fn:extend]] — The semantics on copying mixins.
  //
  // clone :: Obj, Obj... → Obj
  function clone(proto) {
    return extend(make_obj(proto), slice.call(arguments, 1))
  }

  //// Function proto
  // Returns the =[⁣[Prototype]⁣]= of the given object.
  //
  // proto :: Obj → Obj
  // :alias: Object.getPrototypeOf

  ///// Function compose
  // Creates a new object, inheriting from the given =prototype= and
  // implementing the provided =traits=.
  //
  // Differently from the simple =extend= approach, though, the
  // =compose= function doesn't use property precedence, instead,
  // trying to add duplicate properties to an object will throw an
  // error.
  //
  // This is so that the developer can catch these errors and
  // fix them, by mapping property names or by selectively importing
  // names from objects. A =resolve= function is provided to take care
  // of such things.
  //
  // :see-also:
  //    - [[fn:resolve]] — Resolve name conflicts.
  //
  // compose :: Obj, Obj... → Obj
  function compose(proto) { var i, j, key, trait, traits, object, props
    traits = slice.call(arguments, 1)
    object = make_obj(proto)
    for (i = traits.length; i--;) {
      trait = clonablep(traits[i])?  traits[i].__clone__()
            :                        traits[i]
      props = keys(trait)
      for (j = props.length; j--;) {
        key = props[j]
        if (key in object)  key_collision_error(key)
        else                object[key] = trait[key] }}

    return object
  }



  //// -Conflict resolution

  ///// Function resolve
  // Returns a new object, with its own properties ramapped, using the
  // provided rules.
  //
  // compose :: Obj, Obj → Obj
  function resolve(object, mappings) { var result, props, map, new_key
     result = make_obj(proto(object))
     props  = keys(object)
     map    = mappings.map
           || function(key){ return mappings.prefix?  mappings.prefix + key
                                                   :  key }

     if (mappings.only)     props =    keep(props, mappings.only)
     if (mappings.exclude)  props = exclude(props, mappings.exclude)

     props.forEach(function(key) {
       if (map)  new_key = rename(key, map)
       result[new_key] = object[key] })

     return result
  }

  ///// Function take_keyp
  // Higher-order function that applies a filter to a key, returning
  // whether the filter rules passed or not.
  //
  // take-key? :: [Str] | RE | (Str → Bool) → Str → Bool
  function take_keyp(filter) {
    return function(key) {
      return callablep(filter)?  filter(key)
           : testablep(filter)?  filter.test(key)
           : /* array? */        ~filter.indexOf(key) }
  }

  ///// Function keep
  // Filters the array, leaving only the items that pass the provided
  // filter rules.
  //
  // keep :: [Str], [Str] | RE | (Str → Bool) → [Str]
  function keep(keys, filter) {
    return keys.filter(take_keyp(filter))
  }

  ///// Function exclude
  // Filters the array, removing the items that pass the provided
  // filter rules.
  //
  // exclude :: [Str], [Str] | RE | (Str → Bool) → [Str]
  function exclude(keys, filter) {
    filter = take_keyp(filter)
    return keys.filter(function(key){ return !filter(key) })
  }

  ///// Function rename
  // Transform the given key using the given mapping rules.
  //
  // rename :: Str, (Str → Str) | Obj → Str
  function rename(key, mapper) {
    return callablep(mapper)?  mapper(key)
         : /* dictionary? */   mapper[key]
  }


  //// -Basic objects

  ///// Object Base
  var Base = {
    ////// Function copy
    // Creates a new instance of the object, initialising it if the
    // object provides an =__init__= method.
    //
    // copy :: Any... → Obj
    copy:
    function copy() { var result
      result = make_obj(this)
      if (callablep(result.__init__))
        result.__init__.apply(result, slice.call(arguments))
      return result
    },

    ////// Function clone
    // Creates a new object inheriting from this one, and optionally
    // extending it with additonal objects.
    //
    // clone :: Obj... → Obj
    clone:
    function clone() {
      return extend(make_obj(this), arguments)
    },

    ////// Function compose
    // Creates a new object by inheriting from this one, and optionally
    // extending it with the composition of additional traits.
    //
    // compose :: Obj... → Obj
    compose:
    function compose() {
      return compose.apply(null, [this].concat(slice.call(arguments)))
    }
  }




  var old, boo

  if (!exportsp) {
    old = root.boo
    boo = root.boo = {}

    //// Function make_local
    // Removes =boo= from the global object.
    //
    // make-local :: → boo
    boo.make_local = function() {
      root.boo = old
      return boo }}
  else
    boo = exports


  //// Exports
  boo.extend  = extend
  boo.merge   = merge
  boo.clone   = clone
  boo.compose = compose
  boo.resolve = resolve
  boo.proto   = proto
  boo.Base    = Base

  boo.inernal = { key_collision_error: key_collision_error
                , clonablep:           clonablep
                , callablep:           callablep
                , testablep:           testablep
                , take_keyp:           take_keyp
                , exclude:             exclude
                , keep:                keep
                , rename:              rename }

// -- boo.js ends here --
}
( this
, typeof require == 'function'
, typeof exports != 'undefined'
)

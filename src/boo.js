/******************************************************************************
 *                                   ~boo~                                    *
 *                                 ‾‾‾‾‾‾‾‾‾                                  *
 * Provides prototypal utilities for OO.                                      *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

/// Module boo /////////////////////////////////////////////////////////////////
void function (root) {

    var slice    = [].slice
      , keys     = Object.keys
      , make_obj = Object.create
      , proto    = Object.getPrototypeOf



    //// -Error handling

    ///// Function key_collision_error /////////////////////////////////////////
    //
    // Throws an error signaling that a key collision happened when
    // doing trait composition.
    //
    // The property names will have to be manually resolved by the
    // programmer, by using the provided collision handling functions.
    //
    // :thows: Error
    // :: key:Str → Undefined
    function key_collision_error(key) {
        throw new Error('"' + key + '" already exists.')
    }



    //// -Interface testing

    ///// Function objp ////////////////////////////////////////////////////////
    //
    // Checks if something is an object, as opposed to a primitive.
    //
    // Obj :: subject:Any → Bool
    function objp(subject) {
        return Object(subject) === subject
    }

    ///// Function clonablep ///////////////////////////////////////////////////
    //
    // Checks if an object implements a clone factory.
    //
    // A clonable object is any object that implements the special
    // =__clone__= method. The clone method is called without arguments
    // and is expected to return an object.
    //
    // Clonable :: subject:Obj → Bool
    function clonablep(subject) {
        return objp(subject)
            && typeof subject.__clone__ == 'function'
    }

    ///// Function callablep ///////////////////////////////////////////////////
    //
    // Checks if the object can be called directly.
    //
    // Callable :: object:Obj → Bool
    function callablep(subject) {
        return typeof subject == 'function'
    }

    ///// Function testablep ///////////////////////////////////////////////////
    //
    // Checks if the object implements at =test= function.
    //
    // Testable objects are expected to implement a =test= predicate
    // that takes a single argument, an Object, evaluates it and returns
    // whether it passed the test or not.
    //
    // Testable :: subject:Obj → Bool
    function testablep(subject) {
        return objp(subject)
            && typeof subject.test == 'function'
    }



    //// -Object Orientation Utilities

    ///// Function extend //////////////////////////////////////////////////////
    //
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
    // :: object:Obj, [mixins:Obj] → Obj
    function extend(object, mixins) { var i, j, key, len, mixin, props
        for (i = 0, len = mixins.length; i < len; ++i) {
            mixin = clonablep(mixins[i])?  mixins[i].__clone__()
                                        :  mixins[i]
            props = keys(mixin)
            for (j = props.length; j--;) {
                key         = props[j]
                object[key] = mixin[key] }}

        return object
    }

    ///// Function merge ///////////////////////////////////////////////////////
    //
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
    // :: mixins:Obj... → Obj
    function merge() {
        return extend({}, arguments)
    }

    ///// Function clone ///////////////////////////////////////////////////////
    //
    // Creates a new object, inheriting from the given =prototype=.
    //
    // The resulting fresh object is also extended with the provided
    // mixins, if any, from left to right — where properties at right
    // have higher precedence.
    //
    // :see-also:
    //    - [[fn:extend]] — The semantics on copying mixins.
    //
    // :: proto:Obj, mixins:Obj... → Obj
    function clone(proto) {
        return extend(make_obj(proto), slice.call(arguments, 1))
    }

    //// Function proto ////////////////////////////////////////////////////////
    //
    // Returns the =[⁣[Prototype]⁣]= of the given object.
    //
    // :: object:Obj → Obj
    // :alias: Object.getPrototypeOf

    ///// Function compose /////////////////////////////////////////////////////
    //
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
    // :: proto:Obj, traits:Obj... → Obj
    function compose(proto) { var i, j, key, trait, traits, object, props
        traits = slice.call(arguments, 1)
        object = clone(proto)
        for (i = traits.length; i--;) {
            trait = clonablep(traits[i])?  traits[i].__clone__()
                                        :  traits[i]
            props = keys(trait)
            for (j = props.length; j--;) {
                key = props[j]
                if (key in object)  key_collision_error(key)
                else                object[key] = trait[key] }}

        return object
    }



    //// -Conflict resolution

    ///// Function resolve /////////////////////////////////////////////////////
    //
    // Returns a new object, with its own properties ramapped, using the
    // provided rules.
    //
    //
    //
    // :: object:Obj, mappings:Obj → Obj
    function resolve(object, mappings) { var result, props, map, new_key
        result = clone(proto(object))
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

    ///// Function take_keyp ///////////////////////////////////////////////////
    //
    // : (filter:Array|RegExp|Fn) → Fn(key:String) → Bool
    //
    // Higher-order function that applies a filter to a key, returning
    // whether the filter rules passed or not.
    //
    function take_keyp(filter) {
        return function(key) {
            return callablep(filter)?  filter(key)
                 : testablep(filter)?  filter.test(key)
                 : /* array? */        ~filter.indexOf(key) }
    }

    ///// Function keep ////////////////////////////////////////////////////////
    //
    // : (keys:Array, filter:Array|RegExp|Fn) → Array
    //
    // Filters the array, leaving only the items that pass the provided
    // filter rules.
    //
    function keep(keys, filter) {
        return keys.filter(take_keyp(filter))
    }

    ///// Function exclude /////////////////////////////////////////////////////
    //
    // : (keys:Array, filter:Array|RegExp|Fn) → Array
    //
    // Filters the array, removing the items that pass the provided
    // filter rules.
    //
    function exclude(keys, filter) {
        filter = take_keyp(filter)
        return keys.filter(function(key){ return !filter(key) })
    }

    ///// Function rename //////////////////////////////////////////////////////
    //
    // : (key:Str, mapper:Fn|Obj) → Str
    //
    // Transform the given key using the given mapping rules.
    //
    function rename(key, mapper) {
        return callablep(mapper)?  mapper(key)
             : /* dictionary? */   mapper[key]
    }



    ///// Exports //////////////////////////////////////////////////////////////
    var old, boo

    if (typeof exports == 'undefined') {
        old = root.boo
        boo = root.boo = {}

        ///// Method boo.make_local ////////////////////////////////////////////
        boo.make_local = function() {
            root.boo = old
            return boo }}
    else
        boo = exports

    ///// -Properties under boo ////////////////////////////////////////////////
    boo.extend  = extend
    boo.merge   = merge
    boo.clone   = clone
    boo.compose = compose
    boo.resolve = resolve
    boo.proto   = proto

    boo.inernal = { key_collision_error: key_collision_error
                  , clonablep:           clonablep
                  , callablep:           callablep
                  , testablep:           testablep
                  , take_keyp:           take_keyp
                  , exclude:             exclude
                  , keep:                keep
                  , rename:              rename }
}(this)

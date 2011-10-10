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


    //// Function clonablep ////////////////////////////////////////////////////
    //
    // : (object:Obj) → Obj
    //
    // Checks if an object implements a clone factory.
    //
    // A clonable object is any object that implements the special
    // ~__clone__~ method. The clone method is called without arguments
    // and is expected to return an object.
    //
    function clonablep(object) {
        return Object(object) === object
            && typeof object.__clone__ == 'function'
    }

    //// Function extend ///////////////////////////////////////////////////////
    //
    // : (object:Obj, mixins:Array) → Obj
    //
    // Copies all own enumerable properties from the mixins over to the
    // ~object~.
    //
    // Only /own/ and /enumerable/ properties present on the ~mixins~
    // will be carried over, this ensures that the function works the
    // same, even on environments that don't support ECMAScript 5
    // additions for inspecting properties.
    //
    // The copying is done in order, from left to right, such that if a
    // mixin defines a property ~foo~, and a latter mixin also defines a
    // property foo, the latter mixin's property value will overwrite
    // the previous value.
    //
    // If the mixin provides a ~clone~ method, that method is expected
    // to be called with no arguments and return a new object. The
    // returned object will be copied over instead of the original
    // one. This allows the mixin to provide a way of initialising
    // properties that are not meant to be shared, for example, when
    // using the mixin as a data-parent.
    //
    // :warning: side-effects
    //    The function will modify the ~object~ in-place.
    //
    function extend(object, mixins) { var i, j, key, len, mixin, props
        for (i = 0, len = mixins.length; i < len; ++i) {
            mixin = clonablep(mixins[i])?  mixins[i].__clone__()
                                        :  mixins[i]
            props = keys(mixin)
            for (j = props.length; j--;) {
                key         = props[j]
                object[key] = mixin[key] }}

        object.$boo_mixins = (object.$boo_mixins || []).concat(mixins)
        return object
    }


    //// Function merge ////////////////////////////////////////////////////////
    //
    // : (mixins:Obj...) → Obj
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
    function merge() {
        return extend({}, arguments)
    }


    //// Function clone ////////////////////////////////////////////////////////
    //
    // : (proto:Obj, mixins:Obj...) → Obj
    //
    // Creates a new object, inheriting from the given ~proto~.
    //
    // The resulting fresh object is also extended with the provided
    // mixins, if any, from left to right — where properties at right
    // have higher precedence.
    //
    // If the object implements the special method ~__init__~, that will
    // be called to initialise the instance.
    //
    // :see-also:
    //    - [[fn:extend]] — The semantics on copying mixins.
    //
    function clone(proto) {
        return extend(make_obj(proto), slice.call(arguments, 1))
    }

    //// Function proto ////////////////////////////////////////////////////////
    //
    // : (object:Obj) → Obj
    //
    // Returns the prototype of the given object.
    //
    // :alias: Object.getPrototypeOf



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
    boo.extend = extend
    boo.merge  = merge
    boo.clone  = clone
    boo.proto  = proto
}(this)

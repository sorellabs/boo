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

    //// Function plugin ///////////////////////////////////////////////////////
    //
    //   (object:Obj, mixins:Array) → Obj
    //
    // Copies the own enumerable properties from the mixins over to the
    // ~object~.
    //
    // Only /own/ and /enumerable/ properties present on the ~mixins~
    // will be copied, this ensures the function works the same even in
    // environments that don't support ECMAScript 5 object additions for
    // inspecting properties.
    //
    // This copying is done in order, from left to right. If a previous
    // mixin defines a property ~foo~, and a latter mixin also defines a
    // property ~foo~, the latter mixin's property value will overwrite
    // the previous value.
    //
    // :warning: side-effects
    //   The function will modify ~object~ in-place.
    //
    function plugin(object, mixins) { var i, len, mixin
        for (i = 0, len = mixins.length; i < len; ++i) {
            mixin = mixins[i]
            keys(mixin).forEach(function(key) {
                object[key] = mixin[key] })}

        return object
    }

    //// Function merge ////////////////////////////////////////////////////////
    //
    //   (mixins:Obj...) → Obj
    //
    // Merges all given mixins into a single, fresh object.
    //
    // Only the own enumerable properties of each mixin are carried over
    // to the fresh object.
    //
    // :see-also:
    //   - [[fn:plugin]] — for information on how the copying is done.
    //
    function merge() {
        return plugin({}, arguments)
    }

    //// Function inherit //////////////////////////////////////////////////////
    //
    //   (proto:Obj, mixins:Obj...) → Obj
    //
    // Creates a new object using ~proto~ as the ~[⁣[Prototype]⁣]~, and
    // extending it with the given mixins.
    //
    // Mixin extension is done from left to right, as described in
    // [[fn:plugin]].
    //
    function inherit(proto) {
        return plugin(make_obj(proto), slice.call(arguments, 1))
    }

    //// Function receiver /////////////////////////////////////////////////////
    //
    //   (base:Obj, message:String[, allow_mixins:Bool = true]) → Obj
    //
    // Finds the closest ancestor of ~base~ which can handle the given
    // ~message~.
    //
    // Sometimes you want to know which ancestor exactly implements a
    // given message (~property~), and in this case a simple ~in~ check
    // will not do. This method will search up over the ancestor chain
    // of a base object, optionally including the mixins that were set
    // on it, and find the first ancestor that can receive that
    // message.
    //
    // The prototype is searched first, then, if the functionality is
    // not found, we move on to searching the mixin list (in the reverse
    // order they were plugged in).
    //
    // If no immediate ancestor implements the message, the function
    // will keep searching up the prototype chain to try to find the
    // requested functionality. If it definitely can't find the any
    // receiver, ~null~ is returned.
    //
    // :note:
    //   the mixin's prototypes and the base object itself are
    //   *not* included in this search chain. Mixins are expected to be
    //   parent-less anyways.
    //

    //// Function receivers ////////////////////////////////////////////////////
    //
    //   (base:Obj, message:String[, allow_mixins:Bool = true]) → Obj
    //
    // Finds all the ancestors of ~base~ who can handle the given
    // ~message~.
    //
    // The algorithm works similarly to [[fn:receiver]], except that it
    // does not stop on the first receiver.
    //
    // :see-also:
    //   - [[fn:receiver]] — finds only the first receiver for the
    //                       message.
    //


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
    boo.plugin  = plugin
    boo.merge   = merge
    boo.inherit = inherit

}(this)

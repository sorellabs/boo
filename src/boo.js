/******************************************************************************
 *                                   ~boo~                                    *
 *                                 ‾‾‾‾‾‾‾‾‾                                  *
 * Provides prototypal utilities for OO.                                      *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

/// Module boo /////////////////////////////////////////////////////////////////
void function (root) {

    var __old, boo

    //// Function nplugin //////////////////////////////////////////////////////
    //
    //   (object:Obj, mixin:Obj) → Obj
    //
    // Copies the own enumerable properties from the mixin over to the
    // ~object~.
    //
    // Only /own/ and /enumerable/ properties present on the ~mixin~
    // will be copied, this ensures the function works the same even in
    // environments that don't support ECMAScript 5 object additions for
    // inspecting properties.
    //
    // :warning: side-effects
    //   The function will modify ~object~ in-place. For a pure version,
    //   see [[fn:plugin]].
    //

    //// Function plugin ///////////////////////////////////////////////////////
    //
    //   (object:Obj, mixin:Obj) → Obj
    //
    // Copies the own enumerable properties from the mixin over to the
    // ~object~.
    //
    // This is done without modifying the ~object~ (if you want in-place
    // modification for performance or something, use
    // [[!nplugin]]). Only the /own enumerable/ properties, alongside
    // with the prototype chain of the ~object~ will be carried over to
    // the clone.
    //
    // :see-also:
    //   - [[fn:nplugin]] — the destructive (more reliable) version.
    //   - [[fn:clone]]   — the object cloning routine used for purity.
    //

    //// Function merge ////////////////////////////////////////////////////////
    //
    //   (mixins:Obj...) → Obj
    //
    // Merges all given mixins into a single, fresh object.
    //
    // Only the own enumerable properties of each mixin are carried over
    // to the fresh object.
    //
    // This copying is done in order, from left to right. If a previous
    // mixin defines a property ~foo~, and a latter mixin also defines a
    // property ~foo~, the latter mixin's property value will overwrite
    // the previous value.
    //

    //// Function clone ////////////////////////////////////////////////////////
    //
    //   (object:Obj) → Obj
    //
    // Returns a deep clone of the ~object~, but carrying over only the
    // /own enumerable/ properties and the prototype chain.
    //
    // This is done in order to make it work on ancient environments
    // which don't implement the ECMAScript 5 methods for inspecting an
    // object's properties.
    //

    //// Function inherit //////////////////////////////////////////////////////
    //
    //   (proto:Obj, mixins:Obj...) → Obj
    //
    // Creates a new object using ~proto~ as the ~[⁣[Prototype]⁣]~, and
    // extending it with the given mixins.
    //
    // Mixin extension is done from left to right, as described in
    // [[fn:merge]].
    //

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
    if (typeof exports == 'undefined') {
        __old = root.boo
        boo   = root.boo = {}

        ///// Method boo.make_local ////////////////////////////////////////////
        boo.make_local = function() {
            root.boo = __old
            return boo }}
    else
        boo = exports

    ///// -Properties under boo ////////////////////////////////////////////////


}(this)

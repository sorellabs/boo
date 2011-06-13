/******************************************************************************
 *                                   ~boo~                                    *
 *                                 ‾‾‾‾‾‾‾‾‾                                  *
 * Provides prototypal utilities for inheritance + basic traits system.       *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

//// Module boo ////////////////////////////////////////////////////////////////
//
// The goal is to provide a handier prototypal inheritance structure for
// JavaScript programs, by adding new functions to deal with the usual
// pattern in an abstract way, as well as introducing a new system to
// deal with *multiple-inheritance* — traits.
//
// Note that the Traits system implemented by this library is not the
// same as the one in Self; This system is, in fact, closer to `mixins`
// than actual Traits.


//// -Objects and inheritance //////////////////////////////////////////////////
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

void function (root) { var boo, old

    // Some alias for rather JavaLongCommandNamesAndIReallyMeanLong.
    , proto          = Object.getPrototypeOf
    , create         = Object.create
    , slice          = Array.prototype.slice
    , has            = Object.prototype.hasOwnProperty



    function objp(obj) {
        return Object(obj) === obj }

    function fnp(obj) {
        return typeof obj == 'function' }



    ///// Function inherit /////////////////////////////////////////////////////
    //
    //   Fn:ctor  Obj:base  Obj:props? -> Fn:ctor
    //
    // Takes a constructor and a base object, and sets the prototype in
    // the constructor without breaking `instanceof`.
    //
    // If an additional object is passed (as `props`), the properties
    // defined in that object will be copied into the prototype of the
    // constructor as well.
    //
    // Note that these *additional properties* won't have a special
    // inheritance relationship with the constructor's prototype. In
    // fact, they **will** be treated as just being the constructor's
    // own prototype properties.
    // 
    // :warning: side-effects
    //    The given constructor and properties are modified in-place.
    //
    function inherit(ctor, base, props) {
        /*** IFDEF DEBUG
         assert(base,          "Missing `base' parameter")
         assert(dbg.fnp(ctor), "`ctor' isn't a function")
         *** ENDIF */

        if (!props) props = {}

        props.constructor = ctor
        props.$super      = base
        ctor.prototype    = create(base)
        return extend(ctor.prototype, props)
    }


    ///// Function extend //////////////////////////////////////////////////////
    //
    //   Obj:obj  Obj:sources... -> Obj:obj
    //
    // Copies the given source's **own** properties in `obj`.
    //
    // :note:
    //    This is only a **shallow** copy, anything other than
    //    primitives will be copied just as a reference to the original
    //    object.
    //
    // :warning: side-effects
    //    The given `obj` is modified in-place.
    // 
    function extend(obj) { var sources
        sources = slice.call(arguments, 1)

        sources.forEach(function(source) { var key
            for (key in source) 
                if (has.call(source, key))
                    obj[key] = source[key] })

        return obj
    }



    ///// Function can /////////////////////////////////////////////////////////
    //
    //   Obj:obj, Str:attribute, Bool:allow_traits? -> Obj?
    //
    // Searches which of the parents of the given objects implement the
    // attribute, and returns it.
    //
    // Sometimes you want to know which object is capable of doing
    // something, and most of the times a simple `in` check will be
    // enough. For those times where you want to check which of the
    // **ancestors** of an object implement a certain functionality (for
    // calling a `super` method, for example), you have this method.
    //
    // By default, this function will search any of the objects that
    // provides the requested functionality for the base object —
    // traits included.
    //
    // The prototype is searched first, then, if the functionality is
    // not found, we move on to searching the trait list, in the reverse
    // order they were plugged in.
    //
    // If the method is not found in the immediate accessors, the
    // function will keep searching up the prototype chain to try to
    // find the requested functionality. And if it really can't find the
    // attribute, `null` is returned.
    //
    // > Note that the trait's prototypes and the object itself are
    // > **not** included in this search chain.
    //
    function can(obj, attribute, allow_traits) { var bases, cur
        /*** IFDEF DEBUG
         assert(dbg.objp(obj), "`obj' is not an object")
         assert(attribute,     "Missing `attribute' parameter")
         *** ENDIF */
        function get_base(obj) { return obj.$super || obj               }
        function has_attr()    { return cur && has.call(cur, attribute) } 

        if (allow_traits == null) allow_traits = true
        while (obj) {
            bases = [get_base(obj)]
            if (allow_traits) bases.concat(obj.$traits || [])

            while (bases.length) {
                cur = bases.shift()
                if (has_attr()) return get_base(obj) }

            obj = proto(obj) }
    }



    ///// Function upper ///////////////////////////////////////////////////////
    //
    //   Obj:obj  Obj:base  Str:method  args... -> *mixed*
    //
    // Calls a parent method in the context of the given object.
    //
    // This allows for fully prototypal inheritance, without loosing
    // overwritten methods. Because, you see, we assume that methods
    // that were overwritten are somehow **important** and you will want
    // to refer to them on your functions.
    //
    // The given method will **always** be searched on all of the
    // accessors, traits included, and it'll be called in the context of
    // the given object.
    //
    // To avoid errors with *endless recursion*, the super call state
    // (the object that was looked upon last time) is saved on each
    // call, and removed when the function returns.
    //
    // This is done by simple writing to the `$ctx` property, and
    // expects your function to be **synchronous**. If you're calling
    // any asynchronous super method, you'll need to pass the previous
    // stored context explicitly:
    //
    //     boo.upper(this, this.$ctx, "show")
    //
    // :warning: potentially unsafe
    //    This assumes you won't be writing to `$ctx` in your
    //    code. As a rule of thumb, you shouldn't ever have an actual
    //    property with a dollar sign anyways.
    //
    function upper(obj) { var args, base, method
        args = slice.call(arguments, 1)
        base = args.shift()

        if (!objp(base)) {
            method = base
            base   = null }
        else
            method = args.shift()

        if (!base)
            base = obj.$ctx || obj

        return find_ancestor(obj, base, method, args)
    }

    // try to find the first ancestor to implement the method, then
    // return the result of calling this method.
    function find_ancestor(obj, base, method, args) { var _super, rv
        _super   = can(base, method)
        obj.$ctx = _super

        rv = _super[method].apply(obj, args)
        delete obj.$ctx
        return rv
    }



    ///// Function plugin //////////////////////////////////////////////////////
    //
    //   Fn|Obj:obj  Obj:traits... -> Fn|Obj:obj
    //
    // Takes a constructor or an object, and adds traits to the
    // prototype, returning the given object/constructor.
    //
    // Traits are a mechanism to handle the same issue as
    // multiple-inheritance, but in a Prototypal OO manner. The idea is
    // that traits provide just a collection of, perhaps, incomplete
    // functionality that's intended to be plugged in an object.
    //
    // This is more powerful than the classical multiple-inheritance
    // system, because you can plugin traits in the constructor, long
    // after several instances of an object have been created, and all
    // of those instances will magically have that trait available too:
    //
    //     function Mage() {}
    //     Mage.cast = function(spell){ return "You've cast " + spell }
    //
    //     var RedMage = { fira: function(){ this.cast("Fira") }}
    //     var Vivi    = new Mage
    //     Vivi.cast("Blizzard") // You've cast Blizzard
    //
    //     // Makes all Mages learn fire magic
    //     boo.plugin(Mage, RedMage)
    //     Vivi.fira()          // You've cast Fira
    //
    // Not only this, but the traits plugged to a constructor are
    // tracked, and you can call their methods as `super` methods. And
    // as with the prototypal inheritance, you don't need to create a
    // separate meta-object for your functionality, ANY object can be a
    // trait :3
    // 
    // :warning: side-effects
    //    The given `obj` is modified in-place.
    //
    function plugin(obj) { var args, base, ctor
        function get_traits() { return (ctor.$traits || []).concat(args) }

        args = slice.call(arguments, 1)
        base = fnp(obj)? obj.prototype
                       : proto(obj)
        ctor = base.constructor

        ctor.$traits = get_traits()
        extend.apply(obj, [base].concat(args))
        return obj
    }



    ///// Exports ////////////////////////////////////////////////////////////
    if (typeof exports == "undefined") {
        old = root.boo
        boo = root.boo = {}

        boo.make_local = function() {
            root.boo = old
            return boo }}
    else
        boo = exports


    boo.inherit = inherit
    boo.extend  = extend
    boo.can     = can
    boo.upper   = upper
    boo.plugin  = plugin
}(this);

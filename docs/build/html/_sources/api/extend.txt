λ extend()
**********

.. function:: extend(target, sources...)
   :module: boo

   .. code-block:: haskell
   
      extend :: Object, (Object | DataObject)... -> Object

   Extends the target object with the provided mixins, using a right-most
   precedence rule.

This function copies all properties from the given ``sources`` over to the
``target`` object. It is an impure function, and thus the ``target`` object
will be modified in-place — if you're looking for a pure alternative, you can
take a look at :doc:`merge`.

.. code-block:: javascript

   var x = { a: 1, b: 2 }
   boo.extend(x, { c: 3 })
   x
   // => { a: 1, b: 2, c: 3 }


Conflict resolution
===================

If there's any conflict, that is, more than one object defines the same
property, then the property in the right-most object will be used.

.. code-block:: javascript

   boo.extend({ a: 3, b: 2 }, { a: 2, c: 3 }, { a: 1 })
   // => { a: 1, b: 2, c: 3 }


Data objects
============

Data objects are handled gracefully by ``extend``, by using the object returned
by the ``to_data`` method rather than the given object. This means that an
object can control which values to share, and which values to initialise when
used as a *mixin*.

.. code-block:: javascript

   var base_collection = { toString: function() {
                             return '(' + this.items.join(' ') + ')' }}

   var coll1 = { items: [ 1, 2, 3 ] }
   var coll2 = { items: [ 1, 2, 3 ]
               , to_data: function(){
                   return { items: [] } }}


   var instance1 = boo.extend({}, coll1, base_collection)
   instance1.toString()
   // => '(1 2 3)'
   instance1.items.push(4)
   coll1.items.toString()
   // => '1, 2, 3, 4'

   var instance2 = boo.extend({}, coll2, base_collection)
   instance2.toString()
   // => '()'
   instance2.items.push(4)
   coll2.items.toString()
   // => '1, 2, 3'
   


Limitations
===========

``extend`` will only be able to copy the **own enumerable** properties of the
source objects, as such, properties that are inherited from a *[[Prototype]]*
link will not be copied over to the ``target``. Likewise, in newer engines,
properties that have been declared with a ``non-enumerable`` flag will not be
copied.

.. code-block:: javascript

   var x = { a: 1 }
   var y = { a: 2 }
   var z = { __proto__: x, b: 2 }
   Object.defineProperty(z, { c: { value: 3, enumerable: false }})
   boo.extend(y, z)

   // => { a: 2, b: 2 }
   
While this might be a limiting feature in some cases, specially if you're only
targeting newer engines, this allows us to maintain full backwards
compatibility with old engines.


Tutorials and examples
======================

  - `Yay for Sugary JavaScript OO`_ describes how to use ``extend`` and
    ``merge`` to bring the power of `mixins`_ to JavaScript.

  - The :doc:`/user/mixins` chapter in the :doc:`Discover Boo </user/index>`
    reference also describes the usage of ``extend`` and ``merge`` for mixins
    at length.


.. _Yay for Sugary JavaScript OO: http://killdream.github.com/blog/2011/11/for-sugary-object-oriented-js/index.html#sec-2-1
.. _mixins: http://en.wikipedia.org/wiki/Mixin


Related functionality
=====================
    
:doc:`λ merge() <merge>`
   a pure alternative to ``extend``, useful if you don't want to modify the
   ``target`` object.

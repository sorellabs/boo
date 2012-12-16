λ derive()
**********

.. function:: derive(prototype, sources...)
   :module: boo

   .. code-block:: haskell
   
      derive :: proto:Object, Mixin... -> Object <| proto

   Creates a new object inheriting from the given prototype, and extends
   the new instance with the provided *mixins*.


This function works as a higher-level alternative to the standard
`Object.create`_ function. Instead of passing an object with property
descriptors as the second parameter, you may pass any number of plain
JavaScript objects, which will have their *own enumerable* properties copied
over to the new instance.

.. code-block:: javascript

   var Person = {
     say:
     function(thing) {
       return this.name + ': ' + thing }
   }

   var Sophie = boo.derive(Person, {
     name: 'Sophie'
   })

   Sophie.say('hello.')
   // => 'Sophie: hello.'


.. _Object.create: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create


Limitations
===========

``derive`` fills the hole left by ``Object.create`` for the end-user, who does
not care about setting every one of their properties' flags. As such,
``derive`` provides a lightweight of creating a new object, setting its
*[[Prototype]]* slot and initialising it with properties, but doesn't give the
user any additional power — all properties will be *enumerable*, *configurable* and
*writable*. 

Only *own enumerable* properties from the ``sources`` is copied over, and
conflict resolution works in the same manner as :doc:`extend()'s <extend>`.


Tutorials and examples
======================

  - `Understanding JavaScript OOP`_ describes JavaScript's particular
    implementation of Object Orientation — the prototypical model, — which is
    required to understand the implications of using ``derive``.

  - The :doc:`/user/oo` chapter in the :doc:`Discover Boo </user/index>`
    reference describes the usage and implications of ``derive`` at length.


.. _Understanding JavaScript OOP: http://killdream.github.com/blog/2011/10/understanding-javascript-oop/index.html#sec-3


Related functionality
=====================

:doc:`λ extend() <extend>`
   The core implementation of ``derive's`` instance initialisation.

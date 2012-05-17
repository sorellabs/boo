λ merge()
*********

.. function:: merge(sources...)
   :module: boo

   .. code-block:: haskell
   
      merge :: (Object | DataObject)... -> Object

   Creates a new object that merges the provided mixins, using a
   right-most precedence rule.

This function is mostly a convenience for invoking :doc:`extend()
<extend>` with an empty object as target. Please see the ``extend``
documentation for information on the core semantics of ``merge``.

.. code-block:: javascript

   var x = { a: 1 }
   var y = { b: 2 }
   var z = boo.merge(x, y)
   // => { a: 1, b: 2 }

   x
   // => { a: 1 }
   y
   // => { b: 2 }

Limitations
===========

While being pure — the first object passed into the function won't be
changed, — it won't preserve properties nor *[[Prototype]]* chains. In
fact, one could think of ``merge`` as a target-less ``extend``, where
the result is a brand new object that just gathers properties from a
range of sources.


Related functionality
=====================

:doc:`λ extend <extend>`
   ``merge`` is just a convenience for ``extend``. The original function
   is faster, but impure.

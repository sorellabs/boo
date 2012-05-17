λ derive()
**********

.. function:: Base.derive(sources...)
   :module: boo

   .. code-block:: haskell

      derive :: @this:Object, (Object | DataObject)... -> Object <| this

   Constructs a new object that inherits from the object this function is
   being applied to, and extends it with the provided *mixins*.


Derive provides a thin abstraction layer upon the primitive :func:`derive`,
with the only difference being that instead of taking a *[[Prototype]]* as the first
parameter, it uses the object the ``derive`` function has been applied to for
that.

.. code-block:: javascript

   var Point2d = { x: 0, y: 0 }
   var Point3d = boo.derive(Point2d, { z: 1 })


   // Does mostly the same thing as:
   var Point2d = Base.derive({ x: 0, y: 0 })
   var Point3d = Point2d.derive({ z: 1 })


Related functionality
=====================

:doc:`λ derive <../derive>`
   The ``derive`` primitive function documentation page describes the
   function's semantics in more details.

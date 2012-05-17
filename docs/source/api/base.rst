{} Base
*******

.. class:: Base
   :module: boo

   .. code-block:: haskell

      Base :: { init! :: @this:Object*, Any... -> this }

   The root object for basing all the OOP code. Provides all of *Boo's*
   primitive combinators in an easy and extensible OOP-way.



Creating instances
==================

.. function:: Base.make()
   :noindex:

   .. code-block:: haskell

      make :: @this:Object, Any... -> Object <| this

   Constructs new instances of the object the function is being applied to.

   .. rst-class:: detail-link

      :doc:`+ <base/make>`

   
.. function:: Base.derive(sources...)
   :noindex:

   .. code-block:: haskell

      derive :: @this:Object, (Object | DataObject)... -> Object <| this

   Constructs a new object that inherits from the object this function is
   being applied to, and extends it with the provided *mixins*.

   .. rst-class:: detail-link

      :doc:`+ <base/derive>`
   


Summary
=======

.. code-block:: haskell

   init!  :: @this:Object*, Any... -> this
   make   :: @this:Object, Any... -> Object <| this
   derive :: @this:Object, Any... -> Object <| this


.. -------------------------------------------------------------------------
.. toctree::
   :hidden:

   base/make
   base/derive

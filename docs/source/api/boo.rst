{} boo
******


.. module:: boo
   :synopsis: Prototypical utilities for Object Orientation / Composition
   :platform: ECMAScript 5


The **boo** module provides primitives that abstract the semantics of
prototypical object orientation, as implemented by *JavaScript*, such
that these features can be explored with a more usable interface.

The module provides such features as the stand-alone functions:
:func:`extend` and :func:`derive`, as well as an Object interface that can be
extended upon: :class:`Base`.



Internal
========

Interfaces
----------

.. data:: DataObject

   .. code-block:: haskell

      type DataObject :: { "to_data" :: () -> Object }


.. data:: Mixin

   .. code-block:: haskell

      type Mixin :: Object | DataObject



Helpers
-------

.. function:: copy_property(source, target, property)

   .. code-block:: haskell

      copy_property! :: Object, target:Object*, String -> target

   Copies a property from ``source`` to ``target``.



.. function:: data_obj_p(subject)

   .. code-block:: haskell

      data_obj? :: Any -> Bool

   Checks if the given subject matches the :obj:`DataObject` interface.



.. function:: resolve_mixin(object)

   .. code-block:: haskell

      resolve_mixin :: Mixin -> Object

   Returns the proper object for the given ``Mixin``.



.. function:: fast_extend(object, mixins)

   .. code-block:: haskell

      fast_extend! :: target:Object*, [Mixin] -> target

   Extends the target object with the provided mixins, using a
   right-most precedence rule — when there's a property conflict, the
   property defined in the last object wins.

   :obj:`DataObject` instances are properly handled by the
   :func:`resolve_mixin` function.



Public
======
   
Basic primitives
----------------

.. function:: extend(target, mixins...)
   :noindex:

   .. code-block:: haskell

      extend!:: target:Object*, Mixin... -> target

   Extends the target object with the provided ``mixins``, using a
   right-most precedence rule.

   .. rst-class:: detail-link

      :doc:`+ <extend>`


.. function:: merge(mixins...)
   :noindex:

   .. code-block:: haskell

      merge :: Mixin... -> Object

   Creates a new object that merges the provided ``mixins``, using a
   right-most precedence rule.

   .. rst-class:: detail-link

      :doc:`+ <merge>`


.. function:: derive(prototype, mixins...)
   :noindex:

   .. code-block:: haskell

      derive :: proto:Object, Mixin... -> Object <| proto

   Creates a new object inheriting from the given ``prototype`` and
   extends the new instance with the provided ``mixins``.

   .. rst-class:: detail-link

      :doc:`+ <derive>`


.. function:: make(base, mixins...)
   :noindex:

   .. code-block:: haskell

      make :: proto:Object, Mixin... -> Object <| proto

   Constructs a new instance of the given object. This is a convenience generic
   function for the :func:`Base.make` method.



Root object
-----------

.. class:: Base
   :noindex:

   .. code-block:: haskell

      object Base :: { init!  :: @this:Object*, Any... -> this
                       make   :: @this:Object, Any... -> Object <| this
                       derive :: @this:Object, Mixin... -> Object <| this
                     }

   The root object for basing all the OOP code. Provides all of
   *Boo's* primitive combinators in an easy and extensible OOP-way.

   .. rst-class:: detail-link

      :doc:`+ <base>`


      
Summary
=======

.. code-block:: haskell

   -- Interface
      type DataObject :: { "to_data" :: () -> Object }
      type Mixin      :: Object | DataObject

   -- Internal
      copy_property! :: Object, taget:Object*, String -> target
      data_obj?      :: Any -> Bool
      resolve_mixin  :: Mixin -> Object
      fast_extend!   :: target:Object*, [Mixin] -> a

   -- Public
      extend!     :: target:Object*, Mixin... -> target
      merge       :: Mixin... -> Object
      derive      :: proto:Object, Mixin... -> Object <| proto
      make        :: proto:Object, Any... -> Object <| proto
      object Base :: { init!  :: @this:Object*, Any... -> this
                       make   :: @this:Object, Any... -> Object <| this
                       derive :: @this:Object, Mixin... -> Object <| this
                     }


.. toctree::
   :hidden:

   extend
   merge
   derive
   base

λ make()
********

.. function:: Base.make()
   :module: boo

   .. code-block:: haskell

      make :: @this:Object, Any... -> Object <| this

   Constructs new instances of the object the function is being applied to.


This is a generic method that will clone the current object and initialise it
with an initialisation method (``init``). Such initialisation method is taken
from the object the ``make`` method is applied to. This approach makes this
method rather flexible:

.. code-block:: javascript

   var fruit = { init: function(name){ this.name  = name
                                       this.bites = 0 }
               , eat:  function(){ return this.bites++?    'Already eaten.'
                                   :      /* otherwise */  this.name + ' is being eaten.' }}

   // This creates a new object with `fruit' as its prototype, and
   // invokes `fruit's `init' method on it.
   var apple = Base.make.call(fruit, 'Apple')

   apple.eat()
   // => 'Apple has been eaten.'
   apple.eat()
   // => 'Already eaten.'

   // This creates a new object with `apple' as its prototype, and
   // invokes `apple's `init' method on it. Since apple itself doesn't
   // define an `init' method, it's taken from `fruit'.
   var pie = Base.make.call(apple, 'Apple pie')
   pie.eat()
   // => 'Apple pie has been eaten.'

   
The generic object on which ``make`` will be called should either not implement
an ``init`` method at all, or match the following interface:

.. code-block:: haskell

   type Initialisable :: { init! :: @this:Object*, Any... -> this }



Limitations
===========

While *JavaScript's* own ``new`` operator allows one to write factory functions
that work seamlessly with ``new-ful`` invocations, the ``make`` method won't
change the instance depending on what ``init`` returns. That is, it doesn't use
``init`` as a *transformer* function, but rather as an impure initialisation
routine.

If you want to write a factory function, you'll need to use :func:`Base.derive` and
invoke the right initialisation routine instead.

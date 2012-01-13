Object Orientation
==================

The last layer of abstraction defined by ``boo`` is a layer on top of
the previously discussed primitives: :doc:`extend <mixins>` and
:doc:`derive <clone>`. This provides a simple way for developers to
structure their code in terms of objects, composition and inheritance.

The ``boo.Base`` object provides the developer with two simple methods
``derive``, to inherit from the object as you saw in the :doc:`clone`
section; and ``make``, which constructs new instances of the object, and
allowing for separate initialisation.

This allows objects to be easily defined in terms of other objects, by
delegative inheritance::

  var Animal = boo.Base.derive({
    name: 'Unknow'
  , say:  function(thing){ return this.name + ': ' + thing }
  })

  var Cat = Animal.derive({
    init: function(name) {
      this.name = name }
  })

  var nyan = Cat.make('Nyan Cat')
  nyan.say('Nyan nyan nyan~')
  // => 'Nyan Cat: Nyan nyan nyan~

Where the ``derive`` method is the same as the previously discussed, but
relying on ``this`` rather than taking a parent. This allows for code to
be inherited easily, and shared easily. Note that ``derive`` and ``make``
both create a brand new object with the *[[Prototype]]* of whatever
thing they're applied to.

So, you could write::

  var OtherNyan = nyan.clone()

  OtherNyan.isPrototypeOf(Nyan)
  // => True

  OtherNyan.say('Unyuu~')
  // => 'Nyan Cat: Unyuu~'

.. note::

   When ``make`` is called, ``init`` is applied to the new
   instance. It's just an imperative method for initialisation, it
   can't, for example, modify the instance that'll be returned by the
   ``make`` method. You'll need to overwrite ``make`` if you need that
   kind of factory method.
  

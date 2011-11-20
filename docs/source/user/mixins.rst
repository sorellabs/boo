Mixins
======

The first level of abstraction defined in **Boo** is carried by mixins,
which we define as parent-less objects that can be copied into other
objects freely. That is, **Boo** will never care about the
*[[Prototype]]* of mixins, or even take a peek at properties set at
those level.

So, we can see *mixins* as plain objects that provide properties meant
to be included in other objects. For example, given an object ``x`` with
a single property ``a``, an object ``y`` with a single property ``b``,
we could make an object ``z`` that is a *mix* of another plain object
(say one with a single property ``c``), and the previous ``x`` and ``y``
objects::

   var x = { a: 1 }
   var y = { b: 2 }
   var z = boo.extend({ c: 3 }, [x, y])
   console.log(z)
   // => { a: 1, b: 2, c: 3 }

We can think about ``extend`` as something along the lines of: take this
first object, then copies all *own* properties of the other objects into
it. It's a destructive operation, in which the first object will be
modified in place, rather than yielding a brand-new object.

However, the ``extend`` method, and those who build upon it have some
particularities that we will discuss in the following sections.


Data-objects
''''''''''''

As you should know, if you set an *Object* as the value of a property
slot in JavaScript, that only makes a shallow copy of the *Object*. That
is, messing with the fields of that object will affect all copies of
it. This is usually not what we want for objects intended as data
initialisation — for example, defaults for configuration or factories, —
as pushing data to an *Array* would also **alter the actual array in the
default-provider object**.

For this reason, **Boo** allows objects to define their own copying
method, so they can deal with these cases where shallow copying is just
a stab-in-the-back. All *mixins* that implement the method ``toData``
will be allowed to handle the copying process, by returning a brand-new
object that will be used instead of the original *mixin*.

First, we define a default ``ring`` object, which will provide all data
needed for the ``ring`` behaviour. Like an interface that only describes
values (numbers, strings, lists), not behaviours (functions and
methods)::

  var default_ring = {
    items: []
  , max:   3
  }

Then we define a general ``ring`` behaviour, that relies on the previous
conventional interface — an object with an ``items`` array and a numeric
``max`` property::

  var ring = {
    // Pushes an item in the ring, keeping it within the maximum items
    // it can hold.
    push: function(item) {
      this.items.push(item)
      if (this.items.length > this.max)
        this.shift() }

    // Pops an item from the ring, LIFO style.
  , pop: function() { 
      return this.items.pop() }
  }

And with this basic setup we can start creating new objects by composing
the two. For example, a new ring is just::

  var my_ring = boo.extend({}, [ring, default_ring])
  my_ring.push(1)
  console.log(default_ring.items)
  // => [ 1 ]

.. sidebar:: Extending vs Merging

   Cases where there's no target for the mixin inclusion are common with
   *data-objects*. **Boo** provides the ``merge`` function, as a "pure"
   ``extend`` alternative.

But this is just not right. Since the current definitions mutate the
defaults, it can't really be used as... well, defaults. We need a way of
deep copying the data if we need, and handle all the other cases where
we'd want more control over which data is actually set to the objects
including our *data-object*.

That's exactly what the ``toData`` method does. It lets a
*data-object* handle which properties are exposed and how they are
exposed, by creating a new object::

  var default_ring = {
    items: [], max: 3
  , toData: function() {
      return { items: [], max: this.max }}
  }

  var my_ring = boo.extend({}, [ring, default_ring])
  my_ring.push(1)
  console.log(default_ring.items)
  // => [ ]


Conflict resolution
'''''''''''''''''''

When mixing objects in the naivë way, naming conflicts may arise. For
example, if one attempted to merge a self-implemented ``list`` with
the above-mentioned ``ring`` object, both of which would include a
``push`` method, we would have a conflict, given property names must be
unique in an object.

The way ``extend`` handles these conflicts is by giving the rightmost
object the higher precedence, such that::

   // uses `push' from `ring'
   var x = boo.merge(list, ring, default_ring)

   // uses `push' from `list'
   var x = boo.merge(ring, list, default_ring)

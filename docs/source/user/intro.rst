.. title:: Discover Boo › Overview

Overview
========

**Boo** is an object orientation library that abstracts the semantics of
prototypical inheritance, as implemented by *JavaScript*, so they can be
explored with a more usable interface.

This aims to make programs both easier to extend and better structured,
such that they can be more modular and easier to understand for people
reading the code — one of the main goals for all **OrpheOS** projects.

The additional expressiveness are mostly syntatic abstractions to the
already expressive framework for code structuration provided by the
language, which is that of prototypical inheritance. **Boo** takes that
very feature and provides a thin layer over it for making it easier to
define objects in terms of other objects, but also provides a series of
new primitives to do general object composition — the latter, however,
poses some overhead on the code since it's not supported natively by the
language.

.. note::

   The document assumes that the reader is familiar with all the
   particularities of JavaScript's implementation of prototypical
   inheritance. Although **Boo** itself abstracts prototypical
   inheritance and deals with it in a high-level way, the underlying
   semantics are left untouched, and need to be understood in order to
   structure one's code better.

   For an explanation of the semantics in details, you can refer to
   this blog post on the subject: `Understanding JavaScript OOP`_. There
   are also other takes on JavaScript's implementation of prototypical
   OOP, which you may refer to. At any rate, an understanding of the
   underlying semantics — sans constructors — will be assumed
   hereinafter.



.. _Understanding JavaScript OOP: http://killdream.github.com/blog/2011/10/understanding-javascript-oop/index.html

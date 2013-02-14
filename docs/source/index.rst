Boo —at a glance—
=================

Boo provides *easy-modo* prototypical inheritance and object composition
for JavaScript, through mixins and prototype cloning.



.. rst-class:: overview-list

Guides
------

.. hlist::
   :columns: 2

   * :doc:`Discover Boo <user/index>`
        A tour through Boo's concepts and how you can leverage them to
        structure better your code-base.

   * :doc:`API Reference <api/index>`
        A quick reference on the minimal Boo's API, including plenty of
        usage examples and cross-references.

.. toctree::
   :hidden:
 
   user/index
   api/index



.. index:: installing, downloading

Installing
----------

With Node.js and NPM, you can do the easy-modo install:

.. code-block:: sh

    $ npm install boo
    
    # Then require it as usual
    $ node
    node> var boo = require('boo')

In the browser, you have to include the script tag pointing to the
``boo.js`` file:

.. code-block:: html

    <script src="/path/to/boo.js"></script>
    <script type="text/javascript">
      // `boo' is in the global scope now
    </script>



.. index:: platform support

Platform Support
----------------

Boo should support all ECMAScript 5-compliant platforms. It's been
successfully tested in the following platforms:

.. raw:: html

   <ul class="platform-support">
     <li class="ie">8.0</li>
     <li class="safari">5.1</li>
     <li class="firefox">11.0</li>
     <li class="opera">11.62</li>
     <li class="chrome">18.0</li>
     <li class="nodejs">0.6.x</li>
   </ul>


For the legacy platforms (like IE's JScript), you'll have to provide
support for the following methods:

 * Object.keys
 * Object.create
 * Object.getPrototypeOf
 * Array.prototype.forEach
 * Array.prototype.filter
 * Array.prototype.indexOf

The nice `es5-shim`_ library takes care of handling all of those for
you.


.. _es5-shim: https://github.com/kriskowal/es5-shim



.. index:: support, tracker, issues

Support
-------

Boo uses the `Github tracker`_ for tracking bugs and new features.

.. _Github tracker: https://github.com/killdream/boo/issues



.. index:: licence, license

Licence
-------

MIT/X11.

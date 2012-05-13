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



Support
-------

Boo uses the `Github tracker`_ for tracking bugs and new features.

.. _Github tracker: https://github.com/killdream/boo/issues



Licence
-------

Boo is licensed under the delicious and premissive `MIT`_ licence. You
can happily copy, share, modify, sell or whatever — refer to the actual
licence text for ``less`` information:

.. code-block:: bash

   $ less LICENCE.txt

   # The MIT License
   # 
   # Copyright (c) 2011 Quildreen Motta <http://killdream.github.com/>
   # 
   # Permission is hereby granted, free of charge, to any person obtaining a copy
   # of this software and associated documentation files (the "Software"), to deal
   # in the Software without restriction, including without limitation the rights
   # to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   # copies of the Software, and to permit persons to whom the Software is
   # furnished to do so, subject to the following conditions:
   # 
   # The above copyright notice and this permission notice shall be included in
   # all copies or substantial portions of the Software.
   # 
   # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   # IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   # FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   # AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   # LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   # THE SOFTWARE.

   (END)

.. _MIT: https://github.com/killdream/boo/raw/master/LICENCE.txt

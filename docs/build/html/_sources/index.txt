Boo —at a glance—
=================

Boo provides *easy-modo* prototypical inheritance and object composition
for JavaScript, through mixins and prototype cloning::

    var Animal = boo.Base.derive({
      name: 'Unknow'
    
    , say:
      function say(thing) {
        return this.name + ': ' + thing }
    })
    
    var Cat = Animal.derive({
      init:
      function init(name) {
        if (name) this.name = name }
    })
    
    var nyah = Cat.make('Nyan Cat')
    nyah.say('Nyan nyan nyan~')
    // => 'Nyan Cat: Nyan nyan nyan~'



Installing
''''''''''

With Node.js and NPM, you can do the easy-modo install:

.. code-block:: sh

    $ npm install boo
    # Then require it as usual
    node> var boo = require('boo')

In the browser, you have to include the script tag pointing to the
``boo.js`` file:

.. code-block:: html

    <script src="/path/to/boo.js"></script>
    <script type="text/javascript">
      // `boo' is in the global scope now
    </script>


Platform Support
''''''''''''''''

Boo should support all ECMAScript 5-compliant platforms. For the legacy
ones, you'll have to provide support for the following methods:

 * Object.keys
 * Object.create
 * Object.getPrototypeOf
 * Array.prototype.forEach
 * Array.prototype.filter
 * Array.prototype.indexOf

The nice `es5-shim`_ library takes care of handling all of those for
you.


.. _es5-shim: https://github.com/kriskowal/es5-shim


Learning Boo
''''''''''''

.. toctree::
  :maxdepth: 2

  user/intro
  user/mixins
  user/clone
  user/oo
  


Support
'''''''

Boo uses the `Github tracker`_ for tracking bugs and new features.

.. _Github tracker: https://github.com/killdream/boo/issues


Licence
'''''''

Boo is licensed under the delicious and premissive `MIT`_ licence. You
can happily copy, share, modify, sell or whatever — refer to the actual
licence text for ``less`` information::

    $ less LICENCE.txt

.. _MIT: https://github.com/killdream/boo/raw/master/LICENCE.txt


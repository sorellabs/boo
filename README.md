Boo
===

Boo provides utilities to structure a program by means of prototypical
object orientation and object composition, in an easy way. It provides
you with inheritance, composition and mixin facilities, all packaged in
a nice API.

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


Installing
----------

With Node.js and NPM, you can do the easy-modo install:

    $ npm install boo
    # then require it as usual
    node> var boo = require('boo')

In the browser, you have to include the script tag pointing to the
`boo.js` file:

    <script src="/path/to/boo.js"></script>
    <script type="text/javascript">
      // `boo' is in the global scope now
    </script>


Testing
-------

Boo's test cases use [Mocha][] with the BDD assertion module
[should.js][]. For testing on Node.js, you can just grab the module from
NPM and run the test cases by issuing `mocha` from the command line:

    $ sudo npm install -g mocha
    $ mocha

[Mocha]: visionmedia.github.com/mocha/
[should.js]: https://github.com/visionmedia/should.js


Learning
--------

Boo ships with a [full narrated reference manual][ref], covering the
concepts and designs you need to know to use the library effectively.
You can either read it online, or locally — from the file 
`docs/build/html/index.html`. 

Additionally, you can read the following introduction to Boo:

- [Yay for sugary JavaScript OO][intro]


[ref]: http://boo.readthedocs.org/
[intro]: http://killdream.github.com/blog/2011/11/for-sugary-object-oriented-js/index.html


Getting support
---------------

Boo uses the [Github tracker][] for tracking bugs and new features.

[Github tracker]: https://github.com/Orphoundation/boo/issues


Licence
-------

MIT/X11.

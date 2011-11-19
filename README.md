Boo
===

Boo provides utilities to structure a program by means of prototypical
object orientation and object composition, in an easy way. It provides
you with inheritance, composition and mixin facilities, all packaged in
a nice API.

    var animal = boo.Base.clone({
      name: 'Unknow'
    
    , say:
      function say(thing) {
        return this.name + ': ' + thing }
    })
    
    var cat = animal.clone({
      init:
      function init(name) {
        if (name) this.name = name }
    })
    
    var Nyah = cat.make('Nyan Cat')
    Nyah.say('Nyan nyan nyan~')


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


Getting support
---------------

Boo uses the [Github tracker][] for tracking bugs and new features.

[Github tracker]: https://github.com/killdream/boo/issues


Licence
-------

Boo is licensed under the delicious and permissive [MIT][] licence. You
can happily copy, share, modify, sell or whatever — refer to the actual
licence text for `less` information:

    $ less LICENCE.txt

[MIT]: https://github.com/killdream/boo/raw/master/LICENCE.txt

Boo [![Build Status](https://travis-ci.org/killdream/boo.png)](https://travis-ci.org/killdream/boo) ![Dependencies Status](https://david-dm.org/killdream/boo.png)
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
      withName:
      function _withName(name) {
        return this.derive({ name: name }) }
    })
    
    var nyah = Cat.withName('Nyan Cat')
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


Platform support
----------------

ES3 and beyond!

[![browser support](https://ci.testling.com/killdream/boo.png)](http://ci.testling.com/killdream/boo)


Testing
-------

For Node, just:

    $ npm test          # (or make test)
    
    
For the browser:

    $ npm install -g brofist-browser
    $ make browser-test
    # Then point your browsers to the URL on yer console.


Benchmarks
----------

There are a few benchmarks you can run:

```bash
$ make benchmark
```


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


Reference
---------

### `extend(target, mixins...)`

Extends the target with the provided mixins, using a right-most precedence
rule.

```hs
extend: object, mixin... -> object
```

### `merge(mixins...)`

Like `extend`, but pure.

```hs
merge: mixin... -> object
```

### `derive(proto, mixin...)`

Constructs a new object that inherits from `proto`.

```hs
derive: object, mixin... -> object
```

### `Base:make(...)`

Instantiates a new object, and initialises it by calling the `init` method.

```hs
make: @object => A... -> this <| object
```

### `Base:derive(mixin...)`

Like `derive`, but the prototype is the `this` object.

```hs
derive: @object => mixin... -> this <| object
```


Getting support
---------------

Boo uses the [Github tracker][] for tracking bugs and new features.

[Github tracker]: https://github.com/Orphoundation/boo/issues


Licence
-------

MIT/X11.

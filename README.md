Boo
===

[![Build Status](https://secure.travis-ci.org/robotlolita/boo.png?branch=master)](https://travis-ci.org/robotlolita/boo)
[![NPM version](https://badge.fury.io/js/boo.png)](http://badge.fury.io/js/boo)
[![Dependencies Status](https://david-dm.org/robotlolita/boo.png)](https://david-dm.org/robotlolita/boo)
[![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges)

[![browser support](https://ci.testling.com/robotlolita/boo.png)](http://ci.testling.com/robotlolita/boo)

Boo provides utilities to structure a program by means of prototypical
object orientation and object composition, in an easy way. It provides
you with inheritance, composition and mixin facilities, all packaged in
a nice API.


## Example

```js
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
```

## Installing

The easiest way is to grab it from NPM. If you're running in a Browser
environment, you can use [Browserify][]:

    $ npm install boo


### Using with CommonJS

If you're not using NPM, [Download the latest release][release], and require
the `boo.umd.js` file:

```js
var boo = require('boo')
```


### Using with AMD

[Download the latest release][release], and require the `boo.umd.js`
file:

```js
require(['boo'], function(boo) {
  ( ... )
})
```


### Using without modules

[Download the latest release][release], and load the `boo.umd.js`
file. The properties are exposed in the global `boo` object:

```html
<script src="/path/to/boo.umd.js"></script>
```


### Compiling from source

If you want to compile this library from the source, you'll need [Git][],
[Make][], [Node.js][], and run the following commands:

    $ git clone git://github.com/robotlolita/boo.git
    $ cd boo
    $ npm install
    $ make bundle

This will generate the `dist/boo.umd.js` file, which you can load in
any JavaScript environment.


## Testing

For Node, just:

    $ make test
    
    
For the browser:

    $ npm install -g brofist-browser
    $ make browser-test
    # Then point your browsers to the URL on yer console.


## Benchmarks

There are a few benchmarks you can run:

```bash
$ make benchmark
```


## Learning

Boo ships with a [full narrated reference manual][ref], covering the
concepts and designs you need to know to use the library effectively.
You can either read it online, or locally — from the file 
`docs/build/html/index.html`. 

Additionally, you can read the following introduction to Boo:

- [Yay for sugary JavaScript OO][intro]


[ref]: http://boo.readthedocs.org/
[intro]: http://robotlolita.github.io/2011/11/19/for-sugary-object-oriented-js.html


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

[Github tracker]: https://github.com/robotlolita/boo/issues


Licence
-------

Copyright (c) 2011-2014 Quildreen Motta.

Released under the [MIT licence](https://github.com/robotlolita/boo/blob/master/LICENCE).



[Browserify]: http://browserify.org/
[Git]: http://git-scm.com/
[Make]: http://www.gnu.org/software/make/
[Node.js]: http://nodejs.org/
[es5-shim]: https://github.com/kriskowal/es5-shim
<!-- [release: https://github.com/robotlolita/boo/releases/download/v$VERSION/boo-$VERSION.tar.gz] -->
[release]: https://github.com/robotlolita/boo/releases/download/2.0.0/boo-2.0.0.tar.gz
<!-- [/release] -->


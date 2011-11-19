Clones
======

In prototypical object-oriented languages, *cloning* is the act of
making a brand new instance out of another instance, with the same
behaviours but different identities. **Boo** provides a thin layer on
top of these semantics for making defining objects in terms of other
objects easier and sweeter.

The ``clone`` method takes care of setting the *[[Prototoype]]* link of
an object, and optionally extending the new instance with some
:doc:`mixins <mixins>`. The advantage is that property inheritance is
shared and delegative, which makes it both efficient and extensible:

Since inheritance and instantiation have no real difference in a
prototypical language, ``clone`` is used for both. As such, we could
easily make a ``Token`` object that spawns new instances freely. The way
``this`` works in JavaScript makes these particularly sweet::

  var token = {
    // Constructs new instances of a `token' by simply cloning the
    // object and extending it with some behaviour. We also do some
    // processing to set the parent-chain of the tokens.
    make: function(value, parent) { var instance
      // Instantiation is done by the clone method, it'll clone whatever
      // thing the `make' function was applied to.
      instance = boo.clone(this, {
        value:    value
      , children: [] })

      // Then set the parent-chain of the tokens, which is not really
      // related to cloning at all.
      if (parent)  parent.children.push(instance)

      // And return the instance we just created
      return instance }
  }

To show how this "inheritance" — or rather, behaviour sharing — plays
out for structuring programs, we'll make it so that a token is able to
describe itself and all of its children::

  // Returns a whitespace-string with `size' characters
  function indent(size) {
    return size?  Array(size).join(0).split(0).join(' ')
    :             '' }

  // Returns a general representation of a Token
  token.toString = function() {
    return '#<Token ' + this.value + '>' }

  // Describes a Token and its children
  token.describe = function(depth) {
    depth = depth || 0
    return indent(depth) + this.toString()
         + this.describe_children(depth + 2) }

  // Describes the children of a Token
  token.describe_children = function(depth) { var descriptions
    descriptions = this.children.map(function(token) {
      return token.describe(depth + 2) })

    return descriptions.length?  ' {\n' + descriptions.join('\n') + ' }\n'
    :      /* empty? */          '' }

And then we can define other objects that extend the behaviour of a
``Token``, by the same means we used to create new instances of
``Token``::

  var number = boo.clone(token, {
    toString: function() {
      return '#<Number ' + this.value + '>' }
  })

  var brace = token.make('BRACE')
  var zero  = number.make(0, brace)

  brace.describe()
  // => #<Token BRACE> {
  // ..    #<Number 0> }

  zero.describe()
  // => #<Number 0>

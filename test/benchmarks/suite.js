/// suite.js --- Boo benchmarking suite
//
// Copyright (c) 2011 The Orphoundation
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/// -- Helpers ----------------------------------------------------------------
function run(name, suite, cb) {
  var err = 0
  suite.on('cycle', function(event) {
    var bench = event.target
    if (bench.error)
      console.error( '\x1B[0;31m' + ++err + ')'
                   , String(bench)
                   , bench.error.message
                   , '\n' + (bench.error.stack || '')
                   , '\x1B[0m')
    else
      console.log('››', String(bench)) })

  suite.on('complete', function() {
    console.log( '---\nFastest:'
               , this.filter('fastest').pluck('name').join(', '))
    cb && cb() })

  console.log('\x1B[0;36m\n== Running ‹' + name + '› benchmarks.')
  console.log('   Sit back, this can take a while.\x1B[0m\n---')
  suite.run({ defer: true, async: true })}


function run_all(suites) {
  function next() {
    var suite = suites.shift()
    if (suite) run(suite.name, suite.code, next) }
  next() }

/// -- Suite ------------------------------------------------------------------
run_all([ require('./extending')
        , require('./instantiation') ])

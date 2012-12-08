/// extending.js --- Benchmarks for extending objects
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

var Benchmark = require('benchmark')
var boo       = require('../../src/boo')
var suite     = new Benchmark.Suite
var x

function make_object(size, prefix) {
  var result = {}
  while (size--)
    result[prefix + String.fromCharCode(size + 65)] = size
  return result }

function data_object() {
  var z = make_object(100, 'b')
  return { c: [1], d: [2], to_data: function(){ return z }}}

// ----------------------------------------------------------------------------
var o1 = make_object(100, 'a')
var o2 = make_object(100, 'b')

suite.add('λ fast-extend', function() {
  x = boo.internal.fast_extend(o1, [o2]) })

// ----------------------------------------------------------------------------
var o3 = make_object(100, 'a')
var o4 = make_object(100, 'b')

suite.add('λ extend', function() {
  x = boo.extend(o3, o4) })

// ----------------------------------------------------------------------------
var o5 = make_object(100, 'a')
var o6 = make_object(100, 'b')

suite.add('λ merge', function() {
  x = boo.merge(o5, o6) })

// ----------------------------------------------------------------------------
var o7 = make_object(100, 'a')
var o8 = data_object()

suite.add('λ fast-extend (DataObject)', function() {
  x = boo.internal.fast_extend(o7, [o8]) })

// ----------------------------------------------------------------------------
var o9 = make_object(100, 'a')
var o10 = data_object()

suite.add('λ extend (DataObject)', function() {
  x = boo.extend(o9, o10) })

// ----------------------------------------------------------------------------
var o11 = make_object(100, 'a')
var o12 = data_object()

suite.add('λ merge (DataObject)', function() {
  x = boo.extend(o11, o12) })

// ============================================================================
module.exports = { name: 'Extending objects'
                 , code: suite }
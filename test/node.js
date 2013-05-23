var brofist = require('brofist')
var reporter = require('brofist-minimal')

brofist.run(require('./specs'), reporter()).then(function(results) {
  if (results.failed.length)  process.exit(1)
})
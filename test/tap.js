var brofist = require('brofist')
var reporter = require('brofist-tap')

brofist.run(require('./specs'), reporter())
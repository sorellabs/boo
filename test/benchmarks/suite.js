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

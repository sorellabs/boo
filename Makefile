targets = boo.umd.js
bin = $(shell npm bin)
browserify = $(bin)/browserify lib/boo.js

bundle:
	mkdir -p dist
	$(browserify) --standalone boo > $@

clean:
	rm -rf dist

test:
	node ./test/node

browser-test:
	brofist-browser serve test/specs

benchmark:
	node ./test/benchmarks/suite

.PHONY: test

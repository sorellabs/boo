bin        = $(shell npm bin)
lsc        = $(bin)/lsc
browserify = $(bin)/browserify
jsdoc      = $(bin)/jsdoc
uglify     = $(bin)/uglifyjs
VERSION    = $(shell node -e 'console.log(require("./package.json").version)')
TARGET     = boo
GLOBAL     = boo

dist:
	mkdir -p dist

dist/$(TARGET).umd.js: dist
	$(browserify) lib/boo.js --standalone $(GLOBAL) > $@

dist/$(TARGET).umd.min.js: dist/$(TARGET).umd.js
	$(uglify) --mangle - < $^ > $@

# ----------------------------------------------------------------------
bundle: dist/$(TARGET).umd.js

minify: dist/$(TARGET).umd.min.js

dev-tools:
	npm install

clean:
	rm -rf dist

test:
	node ./test/node

benchmark:
	node ./test/benchmarks/suite

documentation:
	cd docs && make html

package: dev-tools documentation bundle minify
	mkdir -p dist/$(TARGET)-$(VERSION)
	cp -r docs dist/$(TARGET)-$(VERSION)
	cp -r lib dist/$(TARGET)-$(VERSION)
	cp dist/*.js dist/$(TARGET)-$(VERSION)
	cp package.json dist/$(TARGET)-$(VERSION)
	cp README.md dist/$(TARGET)-$(VERSION)
	cp LICENCE dist/$(TARGET)-$(VERSION)
	cd dist && tar -czf $(TARGET)-$(VERSION).tar.gz $(TARGET)-$(VERSION)

publish: clean
	npm install
	npm publish

bump:
	node tools/bump-version.js $$VERSION_BUMP

bump-feature:
	VERSION_BUMP=FEATURE $(MAKE) bump

bump-major:
	VERSION_BUMP=MAJOR $(MAKE) bump


.PHONY: test bump bump-major bump-feature documentation publish clean

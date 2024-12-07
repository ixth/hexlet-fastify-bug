console:
	@node-console

test:
	playwright test --reporter=list --config=./exercise_internal

start:
	npx nodemon --watch src bin/index.js

.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
	docker-compose build
	docker-compose run frontend yarn install

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080). 
server:
	docker-compose up --scale backend=2

# `make test` will be used after `make setup` in order to run
# your test suite.
test:
	docker-compose run backend bundle exec rake db:test:prepare
	docker-compose run backend bundle exec rspec
	docker-compose run frontend yarn test --watchAll=false

audit:
	docker-compose run backend bundle exec bundle-audit
	docker-compose run frontend yarn audit --level critical

Prerequisites

# MacOS

* Download and install Docker Desktop, which includes Docker Compose: 
https://docs.docker.com/desktop/mac/install/

# Setup Environment
Copy env-example to .env - the values should work without modification, but if you have any port conflicts (existing services running on these ports), you may need to change them. 

    cp env-example .env

# Setup Docker 

    make setup

# Running tests

## Run the entire test suite:

    make test

## Running just the rails tests: 

    docker-compose run url-shortener-backend bundle exec rspec

## Running just the frontend tests: 

   	docker-compose run frontend yarn test --watchAll=false

# Running the app: 

    make server

Now visit http://localhost:8081 (ignore the console output telling you to visit some other url)
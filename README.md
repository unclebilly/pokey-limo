# Prerequisites

## Ubuntu 20.04 (other versions may work too)

* Ensure you have `make` installed.

      sudo apt-get install make

* Install docker and docker-compose
https://docs.docker.com/engine/install/ubuntu/
https://docs.docker.com/compose/install/

* Add yourself to the newly-created `docker` group (the install above created that group, but you need to be in it now)

    sudo usermod -a -G docker $USER

Now REBOOT YOUR MACHINE and confirm that you are in the `docker` group. In a terminal, type:

    $ groups

This should show "docker" as one of the results.

## MacOS

* Ensure you have `make` installed.

      xcode-select --install

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

    docker-compose run backend bundle exec rspec

## Running just the frontend tests: 

   	docker-compose run frontend yarn test --watchAll=false

# Running the app: 

    make server

Now visit http://localhost:8081 (ignore the console output telling you to visit some other url)
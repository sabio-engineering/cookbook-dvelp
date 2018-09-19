# Circle CI 2.0 configurations for Rails project

## Basic Concepts

CircleCI 2.0 operates on a differently structurized YAML file located under `.circleci/config.yml`.

It's safe to say that every config should contain at least three keywords: `version, jobs`.
Initially, it should start looking something like this:
```
---
version: 2
jobs:
    build:
        working_directory: ~/your-app-name
    steps:
        - checkout
```
This intital setup is not going to work. But it’s the basic shell of the config file we’ll need.

## Basic Configurations.

### Select image for Docker executor
Which will compose the environment from a set of Docker images [CircleCI provide set of pre-built images that we’ll use. ](https://hub.docker.com/r/circleci/ruby/tags/)
These cover lots of different Ruby versions, with variations for common requirements like a browser and/or JavaScript.
```
jobs:
    build:
        working_directory: ~/your-app-name
        docker:
            - image: circleci/ruby:2.5.1-node-browsers
            environment:
                RAILS_ENV: test
```
This will set Docker executor to run 2.5.1 ruby version with browser in the box.

### Set up database configurations
Same as with Docker, we need to select image to preload correct versions of postgres. Here it is `postgres:9.6.2-alpine`. And set environment variables as from `config/database.yml`
```
    build:
        working_directory: ~/your-app-name
        docker:
            - image: circleci/ruby:2.5.1-node-browsers
            environment:
                RAILS_ENV: test

            - image: circleci/postgres:9.6.2-alpine
            environment:
                POSTGRES_USER: postgres
                POSTGRES_DB: test_database_name
```

## Process running steps
Starting from this. All commands go in the `steps` key. Which begin with:
```
    steps:
      - checkout
```

### Prepare environment
As we are almost all using `figaro` gem to manage environment variables. Here is a recipe to create/copy example `application.yml` file.
```
      - run:
          name: Create environment variables file
          command: |
            cp config/examples/application.yml config/application.yml
```
Where `name` will set name of the task. And `command` will be exact bash line to be executed.
You can create any type of commands to run, give them names and place in correct order if you need.

### Install gems
Running `bundle` for each test run can be slow and is easy to cache. To give us a little speed improvement, we can do something like this:
```
      - restore_cache:
          keys:
          - v1-dependencies-{{ checksum "Gemfile.lock" }}
          - v1-dependencies-

      - run:
          name: Install dependencies
          command: |
            bundle install --jobs=4 --retry=3 --path vendor/bundle

      - save_cache:
          paths:
            - ./vendor/bundle
          key: v1-dependencies-{{ checksum "Gemfile.lock" }}
```
This will try and restore any cached dependencies using a checksum based on your lock file.

### Avoiding race conditions
One problem we should take care of though is race conditions to do with how the additional services come up. It’s possible that Postgres might take slightly longer to be available and so our tests might start running …and then all fail.

To solve this, we can use dockerize to wait for the appropriate port to be available. Add this as a run step:
```
      - run:
          name: Wait for DB
          command: dockerize -wait tcp://localhost:5432 -timeout 1m
```
### Create database from schema
```
      - run:
          name: Database setup
          environment:
            DATABASE_URL: 'postgres://postgres@localhost:5432/test_database_name'
          command: |
            bundle exec rake db:create db:schema:load --trace
            bundle exec rake db:migrate
```

### Run tasks
We can execute any tasks we want. But let's assume we need `rubocop` and `rspec` tests only.
Keeping tasks in different `run` commands allows us give them name and will keep them as different processes during CI running.
```
      - run:
          name: Rubocop
          command: bundle exec rubocop

      - run:
          name: Tests
          environment:
            DATABASE_URL: 'postgres://postgres@localhost:5432/test_database_name'
          command: |
            bundle exec rspec spec --format progress
```

## At the end file should look like:
```
---
version: 2
jobs:
  build:
    working_directory: ~/your-app-name
    docker:
       - image: circleci/ruby:2.5.1-node-browsers
         environment:
           RAILS_ENV: test
           RACK_ENV: test

       - image: circleci/postgres:9.6.2-alpine
         environment:
           POSTGRES_USER: postgres
           POSTGRES_DB: dopay-payengine_test

    steps:
      - checkout

      - run:
          name: Create environment variables file
          command: |
            cp config/examples/application.yml config/application.yml

      - restore_cache:
          keys:
          - v1-dependencies-{{ checksum "Gemfile.lock" }}
          - v1-dependencies-

      - run:
          name: Install dependencies
          command: |
            bundle install --jobs=4 --retry=3 --path vendor/bundle

      - save_cache:
          paths:
            - ./vendor/bundle
          key: v1-dependencies-{{ checksum "Gemfile.lock" }}

      - run:
          name: Wait for DB
          command: dockerize -wait tcp://localhost:5432 -timeout 1m

      - run:
          name: Database setup
          environment:
            DATABASE_URL: 'postgres://postgres@localhost:5432/dopay-payengine_test'
          command: |
            bundle exec rake db:create db:schema:load --trace
            bundle exec rake db:migrate

      - run:
          name: Rubocop
          command: bundle exec rubocop

      - run:
          name: run tests
          environment:
            DATABASE_URL: 'postgres://postgres@localhost:5432/test_database_name'
          command: |
            mkdir /tmp/test-results
            bundle exec rspec spec --format progress
```

## References:
- https://circleci.com/docs/2.0/language-ruby/
- https://robots.thoughtbot.com/circleci-2-rails
- https://www.netguru.co/codestories/circleci-2.0-concepts-explanation-by-example

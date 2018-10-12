# Circle CI 2.0 Configuration for Rails

The following is a recommended setup for Circle CI 2.0 with any rails project. This guide will walk you through the different parts of the setup to get you familiar with the process.

If you just want the script, it's [here](#the-end-result)

## Basic Concepts

CircleCI 2.0 requires a new dot folder and YAML config as follow: `.circleci/config.yml`.

Each config must contain the following 2 keys: `version` and `jobs`.
Initially, your setup will look like this:
```
---
version: 2
jobs:
    build:
        working_directory: ~/your-app-name
    steps:
        - checkout
```
This setup won't work, but it provides the framework of the configuration file. The remainder of the guide will explain how to flesh is out.

## Basic Configuration

### Select Image for Docker
The docker image will help to compose a consistent environment for each build. There are a set of [prebuilt images](https://hub.docker.com/r/circleci/ruby/tags/) to choose from, which cover different ruby versions and other common requirements like browser and/or JavaScript.

The following config will set Docker to run ruby 2.5.1 with browser in the box:
```
jobs:
    build:
        working_directory: ~/your-app-name
        docker:
            - image: circleci/ruby:2.5.1-node-browsers
            environment:
                RAILS_ENV: test
```

### Configure your Database
As with Docker, we need to select an image to preload the correct version of Postgres.  The below config uses `postgres:9.6.2-alpine` and the environment variables are loaded from  `config/database.yml`.
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

## Configure your Steps
Circle CI 2.0 uses the `steps` key to determine the order in which the build is processed. These steps include `checkout`, `run`, `restore_cache` etc.

### Prepare your Environment
We almost always use `figaro` gem for storing and loading environment variables, so firstly we must create a copy of the `application.yml` file:

```
      - run:
          name: Create environment variables file
          command: |
            cp config/examples/application.yml config/application.yml
```
Where `name` will set name of the task. And `command` will be exact bash cmd to be executed.
The `run` key gives lots of flexibility to run any command and in any order. Just  give them a name, a command to run and off you go.

### Install Gems
Rather than running `bundle` for each build, which can be slow, we can cache the bundle to reduce the time the build takes to run:
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

### Avoiding Race Conditions
We need to make sure that we avoid certain commands from running before their dependencies are ready. For example, we need to make sure Postgres is up before we run our test suite.

To solve this, we can tell `dockerize` to wait for a given port before it runs the next command:
```
      - run:
          name: Wait for DB
          command: dockerize -wait tcp://localhost:5432 -timeout 1m
```
### Create your Database

If you try to run your test suite against an empty DB, it's going to fail. Make sure it's got the correct data structure by loading the schema:

```
      - run:
          name: Database setup
          environment:
            DATABASE_URL: 'postgres://postgres@localhost:5432/test_database_name'
          command: |
            bundle exec rake db:create db:schema:load --trace
            bundle exec rake db:migrate
```

### Run Tasks
We can execute as many tasks as we want. Typically we would run our lints, `rubocop` and our tests `rspec`, so here is the configuration for that:
By creating one `run` command per task we can give them a descriptive name and keep them as separate  processes during the build.
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

## The End Result
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

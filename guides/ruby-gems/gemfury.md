# Gemfury Usage

Gemfury is a private gem server that we use to easily manage access to private gems.

## Publishing a Gem

To publish new gem or new version of the gem you need to follow the steps below:

- Install gemfury gem: `gem install gemfury`
- Authenticate with your Gemfury login credentials:  `fury login`
- Build the gem: `gem build <your_gem_name>.gemspec`
- Upload your package: `fury push <your_gem_name>-<your_gem_version>.gem --as=dvelp`

That’s it!

### Publishing via Cicrle CI

To have the gem automatically published when a new version is created, add the following to your `circle.yml` file:

```
- run:
    name: Publish gem to gemfury
    command: |
      if [ "${CIRCLE_BRANCH}" == "master" ]
      then
        gem install gemfury
        gem build <your_gem_name>.gemspec
        fury push $(ls | grep <your_gem_name>-) --as=dvelp --api-token=$BUNDLE_GEM__FURY__IO
      else
        echo "Publishing to gemfury allowed only for master branch"
      fi
```

## Installing a Gem

To install a gem from gemfury you need to follow the steps below:

- Copy your personal access token from [here](https://manage.fury.io/manage/dvelp/tokens).
- Configure your bundler: `bundle config gem.fury.io <your_token>`
- For builds and deployment, you may configure authentication through the environment: `export BUNDLE_GEM__FURY__IO=<your_token>`
- Add new source to your Gemfile: `source 'https://gem.fury.io/dvelp'`
- Bundle!

### Configure Authentication on CircleCI and Heroku

To allow Circle CI and Heroku to install gems from gemfury you simple need to set your auth token to new environment variable: `BUNDLE_GEM__FURY__IO: <your_token>`

## Other Links

For more information visit https://gemfury.com/help/getting-started

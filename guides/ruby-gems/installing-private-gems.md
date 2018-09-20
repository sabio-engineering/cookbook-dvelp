# Installing Private Gems

At DVELP, we have a number of gems (private repos) that we use internally. The
following is a brief guide on how to install them both locally and on Heroku.

## Fetch a GitHub Oauth Token

To authenticate Bundler on GitHub, you will need an OAuth token. GitHub have a
nice [guide](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) on how to do this.

## Set up Your Credentials

To install the credentials for your current project (dir):

```
bundle config GITHUB__COM myoauthtoken:x-oauth-basic
```

Or, if you want to install the credentials globally:

```
$ bundle config --local GITHUB__COM myoauthtoken:x-oauth-basic
```

## Add to Your Gemfile

Add your private repo the application Gemfile:

```
gem 'dvelp_gem', git: 'https://github.com/DVELP/dvelp_gem.git'
```

Then run `bundle install` and you are good to go!


## Installing on Heroku

Installing private gems on Heroku is fairly straightfoward. Make sure you have
your OAuth token, then run the following command:

```
heroku config:add BUNDLE_GITHUB__COM=myoauthtoken:x-oauth-basic --app my-app
```

Next time you deploy the application, the private gem will be installed when
bundler runs.


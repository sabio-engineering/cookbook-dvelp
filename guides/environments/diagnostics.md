# Diagnostics
Shipping apps to a production environment is paramount in our development cycle. Having the correct tools in place to monitor and diagnose issues is essential.

The following is the baseline setup for logging and error tracking in Rails applications at DVELP.

## Naming

Make sure you have the same names for Heroku application, sentry project and papertrail system e.g. `dvelp-production`. Consistency in naming conventions is very important.

## Logging

### Papertrail

For consistency and consolidation, we use a corporate [Papertrail](https://papertrailapp.com) account for logging purposes.

### Setup

This [guide](https://papertrailapp.com/systems/setup?type=app&platform=heroku) will help you get Papertail set up on Heroku environments.

### Lograge

To prevent overly verbose logs, we recommend using [lograge](https://github.com/roidrage/lograge) to filter out the noise and provide more clarity.

```ruby
# config/initializers/lograge.rb

Rails.application.configure do
  config.lograge.enabled = Rails.env.production?
  config.lograge.custom_options = lambda do |event|
    exceptions = %w[controller action format]
    {
      params: event.payload[:params].except(*exceptions)
    }
  end
end
```

If you’re using Rails 5's API-only mode and inherit from `ActionController::API`, you must define it as the controller base class which lograge will patch:

```ruby
config.lograge.base_controller_class = 'ActionController::API'
```

Use `info` log level to remove unnecessary debugging logs.

```ruby
# config/environments/production.rb

config.log_level = :info
```

## Error Handling

We equally have a corporate [Sentry](https://sentry.io) account for error handling. Sentry is a service designed to help you monitor application issues in realtime.

### Setup
Complete the following steps to setup Sentry in your application:

- Create [new project](https://sentry.io/organizations/dvelp/projects/new) on the DVELP corporate account
- Add `gem 'sentry-raven'` to your Gemfile and run `bundle install`
- Set `SENTRY_DSN` ENV variable. Sentry will give you this when creating a new project (step 1).
- Set `SENTRY_ENVIRONMENT` ENV variable accordingly.

To make sure your application doesn't send any confidential information like passwords, set sanitize fields:

```
# config/initializers/sentry.rb

Raven.configure do |config|
  config.sanitize_fields = Rails.application.config
    .filter_parameters.map(&:to_s)
  config.current_environment = ENV.fetch('SENTRY_ENVIRONMENT', 'production')
end
```

Also, the last `config` line allows you to set the proper environment to your Sentry project.

### Testing

To send a test event after setting up Sentry in your application, run the following command:

`rails raven:test`

And for Heroku:

`heroku run rails raven:test --remote <git_remote>`

### Slack integration

Don't forget to add notifications to your project Slack channel. To enable this feature go to Sentry project settings and choose 'Alerts' section.

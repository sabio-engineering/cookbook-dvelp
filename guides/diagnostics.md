# Diagnostics
Shipping apps to a production environment is paramount in our development cycle. Having the correct tools in place to monitor and diagnose issues is essential.

The following is the baseline setup for logging and error tracking in Rails applications at DVELP.

## Naming

Make sure you have the same names for Heroku application, sentry project and papertrail system. It's very important to keep all things with correct naming, e.g. `dvelp-production`

## Logging

### Papertrail

For consistency and consolidation, we use a corporate [Papertrail](https://papertrailapp.com) account for logging purposes.

### Setup

Creating a new papertrail system for Heroku applications - [https://papertrailapp.com/systems/setup?type=app&platform=heroku]()

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

As with the [papertrail](https://papertrailapp.com) corporate account we have [Sentry](https://sentry.io) account. It's a service that helps you monitor an application crashes in realtime.

### Setup
To install Sentry for your application you have to do following steps:

- Create [new project](https://sentry.io/organizations/dvelp/projects/new) on corporate account
- Add `gem 'sentry-raven'` to your Gemfile and install the gem
- Set `SENTRY_DSN` ENV variable. This value you can find on new account creation step

To make sure your application doesn't send any confidential information like passwords, set sanitize fields:

```
# config/initializers/sentry.rb

Raven.configure do |config|
  config.sanitize_fields = Rails.application.config
    .filter_parameters.map(&:to_s)
end
```

### Slack integration

Don't forget to add slack notifications to specific Slack channel. To enable this feature go to Sentry project settings and choose 'Alerts' section.

# Code Style

At DVELP we value our code quality. These style guides help to keep our code
consistent and looking beautiful. The guides are derived from practices and
conventions generally accepted and used by the wider community.

## Getting Started

We understand that no two projects are the same, each one a little different to
the next. With that in mind, we recommend using these guides as starting point.
They can be tweaked and moulded on a per project basis, but make sure everyone
on the team is comfortable with any adjustments you make.

## Configs

We use a number of tools to enforce style compliance:

  * JSHint for Javascript lints
  * Rubocop for Ruby lints
  * SCSS Lint, for SCSS lints
  * Slim Lint, well, for Slim lints

First, you need to add the gems to your project's Gemfile:

```ruby
group :development, :test do
  gem 'jshint', require: false
  gem 'rubocop', require: false
  gem 'scss_lint', require: false
  gem 'slim_lint', require: false
end
```

Then you need to add some configs that implement our styles.

The following is a list of configuration files you're encouraged to use in a new
project:

* [JSHint](.jshint.yml)
* [Rubocop](.rubocop.yml)
* [SCSS Lint](.scss-lint.yml)
* [Slim Lint](.slim-lint.yml)

These files should go into your project's root directory.

You should run the lints as a part of your build. To add lints to the default
task you can use the following rake file. Just put it into `lib/tasks`
directory.

* [lints.rake](lints.rake)

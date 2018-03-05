# Application template recipe for the rails_apps_composer. Change the recipe here:
# https://github.com/RailsApps/rails_apps_composer/blob/master/recipes/devise.rb

stage_two do
  say_wizard "recipe stage two"
  if prefer :authentication, 'devise'
    # prevent logging of password_confirmation
    gsub_file 'config/initializers/filter_parameter_logging.rb', /:password/, ':password, :password_confirmation'
    generate 'devise:install'
    generate 'devise_invitable:install' if prefer :devise_modules, 'invitable'
    setup_devise
  end
  ### GIT ###
  git :add => '-A' if prefer :git, true
  git :commit => '-qm "rails_apps_composer: devise"' if prefer :git, true
end

def setup_devise
  gsub_file 'config/initializers/devise.rb',
            /config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'/,
            "config.mailer_sender = ENV['ADMIN_EMAIL']"
end

__END__

name: devise
description: "Add Devise for authentication"
author: vfonic

requires: [setup, gems]
run_after: [setup, gems]
category: dvelp

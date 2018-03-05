# Application template recipe for the rails_apps_composer.

prefs[:deployment] = multiple_choice "Prepare for deployment?", [["no", "none"],
    ["Heroku", "heroku"],
    ["Capistrano", "capistrano3"]] unless prefs.has_key? :deployment

if prefer :deployment, 'heroku'
  raise 'Heroku recipe is still work in progress'

  say_wizard 'Creating Heroku app'

  prefs[:heroku_pipeline] = ask_wizard('Create heroku pipeline?')
  if prefs[:heroku_pipeline]
    run "heroku apps:create #{app_name}-pro"
    run "heroku apps:create #{app_name}-staging"

    say_wizard 'setting up heroku git remotes'
    run 'git remote rename heroku heroku-production'
    run "git remote add heroku https://git.heroku.com/${app_name}-staging.git"
    run 'git config heroku.remote heroku'
  else
  # run "heroku apps:create #{app_name}"
  end
  say_wizard "installing heroku addons: #{prefs[:heroku_addons].join(', ')}"

  prefs[:heroku_postgres] = multiple_choice "Choose heroku postgres plan", [
    ["Heroku", "heroku"],
    ["Capistrano", "capistrano3"]] unless prefs.has_key? :deployment
  if prefs[:heroku_postgres]
    heroku addons:create heroku-postgresql:hobby-dev
end

stage_three do
  ### GIT ###
  git :add => '-A' if prefer :git, true
  git :commit => '-qm "rails_apps_composer: prepare for deployment"' if prefer :git, true
end

__END__

name: heroku
description: "Prepare heroku"
author: vfonic

requires: [dvelp_deployment]
run_after: [dvelp_deployment]
category: dvelp

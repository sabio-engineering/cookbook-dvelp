# Adding apps to Heroku pipeline

## Prerequisites:

### Verified account

Means you need to have your credit card details added to your account: [https://dashboard.heroku.com/account/billing](https://dashboard.heroku.com/account/billing)

### Staging app

If you don't have staging app, create it by forking the production app using the following command `heroku fork --from ${app_name} --to ${app_name}-staging [--skip-pg]`(* - check fusnote) [1]

* Note that `${app_name}-staging` app must **NOT** exist already
* Use staging app as default app for heroku CLI commands: [2]

    ```
    git remote rename heroku heroku-production
    git remote add heroku https://git.heroku.com/${app_name}-staging.git
    git config heroku.remote heroku # use 'heroku' remote as default for heroku CLI
    ```

    * Last command is **very important**! Without it, your default app will be production (or any `$ heroku` command will fail). To make sure it's set up correctly, run: `heroku info`. First line of the output should say: `=== {app_name}-staging`

* The above command **copies** all database **data** to a new database and all config vars.
    * The database data is not copied if `--skip-pg` is passed as an option
    * To reduce costs of your **newly created** database run: [3] [4]

        ```
        heroku addons:create heroku-postgresql:hobby-dev # [3]
        heroku config
        heroku pg:copy DATABASE_URL HEROKU_POSTGRESQL_${colour}_URL # [4]
        heroku pg:promote HEROKU_POSTGRESQL_{colour}
        heroku addons:destroy HEROKU_POSTGRESQL_${old_db_colour}
        ```
        Note that `${colour}` represents the colour of your newly created postgresql database, while `${old_db_colour}` represents the colour of your old database.

    * Update config vars as needed
      * Remember to update carrierwave AWS S3

* If you don't need SSL addon, remove it `heroku addons:destroy ssl`
* Staging app is now in **your ownership**. Any charges will happen on your account. Change staging app permissions if needed (add users, transfer ownership, etc.).
    * First add users, then transfer ownership, as the later will impede your access to adding users.
    * `heroku sharing:add ${collaborator}@dvelp.co.uk -a ${app_name}-staging`
    * `heroku sharing:transfer ${collaborator}@dvelp.co.uk -a ${app_name}-staging`

### heroku-pipelines addon for Heroku Toolbelt

* Install it by executing `heroku plugins:install heroku-pipelines`

## Setup

1. Create the pipeline (from the app directory): [5]

    `heroku pipelines:create ${pipeline_name}`

    It's good to call the `${pipeline_name}` similar or the same as production app name.

2. Add staging app to the pipeline:

    `heroku pipelines:add -a ${app_name}-staging ${pipeline_name}`

## Promote!

This will promote the `${app_name}-staging` (staging app) to `${app_name}` (production)
`heroku pipelines:promote -a ${app_name}-staging`

### FAQ

#### Can I run scripts, such as rake db:migrate when promoting?

No, not at this time.

## Sources

1. [Fork app](https://devcenter.heroku.com/articles/fork-app)
* [Heroku Toolbet default app](http://stackoverflow.com/questions/17497947/is-there-a-way-to-set-heroku-toolbet-default-app)
* [Heroku Postgresql Addon](https://elements.heroku.com/addons/heroku-postgresql#addon-plans)
* [Upgrading Heroku Postgres Databases](https://devcenter.heroku.com/articles/upgrading-heroku-postgres-databases)
* [Heroku Pipelines](https://devcenter.heroku.com/articles/pipelines)


*****

*
###### Note that you can set shell variables like this `app_name="braid-mackenzie"`, and run most of the commands without having to change anything. Here's the list of variables needed:

```
app_name=""
collaborator=""
pipeline_name=""
colour=""
old_db_colour=""
```

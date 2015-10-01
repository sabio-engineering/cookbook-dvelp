# Creating a new Heroku app

## Create admin email

For testing purposes, create new @dvelp.co.uk email and forward to collaborators as needed.

## Create app pipeline

Follow the instructions in `Heroku Pipeline.md`

## Schedule postgres backups

`heroku pg:backups schedule DATABASE_URL --at '03:00 UTC'` [1]

## Sources

1. [Heroku Postgres Backups](https://devcenter.heroku.com/articles/heroku-postgres-backups)

    -- This document is a draft. There are parts that are missing.

# Creating a new Heroku app

## Setup admin email

For testing purposes, setup an admin email and forward the instructions to collaborators as needed.

## Create app pipeline

Follow the instructions in `Heroku Pipeline.md`

## Schedule postgres backups

`heroku pg:backups schedule DATABASE_URL --at '03:00 UTC'` [1]

## Sources

1. [Heroku Postgres Backups](https://devcenter.heroku.com/articles/heroku-postgres-backups)

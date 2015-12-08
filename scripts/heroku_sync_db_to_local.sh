#!/bin/zsh
# Script for syncing remote DB to local

APP_NAME=$1
DB_NAME=$2
DUMP_FILE='latest_backup.dump'

if [ -n "$APP_NAME" ] && [ -n "$DB_NAME" ]; then

  # Create new backup
  echo "Creating backup for $APP_NAME..."
  heroku pg:backups capture --app $APP_NAME
  wait

  # Fetch the dump from remote
  echo "Fetching backup for $APP_NAME..."
  curl -o $DUMP_FILE `heroku pg:backups public-url -a $APP_NAME`
  wait

  # Restore the local DB from dump
  echo "Restoring local DB $DB_NAME..."
  pg_restore --verbose --clean --no-acl --no-owner -h localhost -d $DB_NAME $DUMP_FILE

  # Delete local .dump
  echo 'Cleaning up...'
  rm $DUMP_FILE
else
  echo 'You must specify an app and local DB name.'
fi

#!/bin/bash

set -e

sourceApp="$1"
targetApp="$2"
defaultKeys=(DATABASE_URL REDISTOGO_URL SENDGRID_PASSWORD SENDGRID_USERNAME)

while read key value; do
  key=${key%%:}
  if [[ ${defaultKeys[*]} =~ $key ]];
  then
    echo "Ignoring $key=$value"
  else
    echo "Setting $key=$value"
    heroku config:set "$key=$value" --app "$targetApp"
  fi
done  < <(heroku config --app "$sourceApp" | sed -e '1d')

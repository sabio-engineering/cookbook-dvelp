# DVELP Scripts

A collection of shell scripts that we use at DVELP for our making the everyday more efficient.

# Heroku Sync DB to Local

Get it: [heroku\_sync_db_to_local.sh](https://github.com/DVELP/cookbook/blob/master/scripts/heroku_sync_db_to_local.sh)

Back-up and sync your remote DB to your local machine.

  * Requires two parameters: app_name and local_db_name

Example:
```
heroku_sync_db_to_local.sh my-app my_app_db
```

Alias:
```
hdbsync = heroku_sync_db_to_local.sh
```

# Heroku Remotes

Get it: [git\_heroku\_add.sh](https://github.com/DVELP/cookbook/blob/master/scripts/git_heroku_add.sh)

Quickly setup heroku remotes for deploying to pipeline apps.

  * Requires two parameters: remote_name and heroku_app_name

Example:
```
git_heroku_add.sh staging dvelp-staging
```

Alias:
```
har = git_heroku_add.sh
```

# Merging Pull Requests

Get it: [git\_merge\_pull\_request.sh](https://github.com/DVELP/cookbook/blob/master/scripts/git_merge_pull_request.sh)

Close pull-requests, merge and clean-up branches with ease.

  * Requires current git branch to be the branch you want to merge to master
  * Takes no parameters

Example:
```
git_merge_pull_request.sh
```

Alias:
```
gm pr = git_merge_pull_request.sh
```

# DVELP Scripts

This is a collection of small and big shell scripts that we use in DVELP for our everyday work.

For best experience with git scripts, create alias for each. Edit your `~/.gitconfig` file and add the following:

```
[alias]
	add-heroku-remote = !${path_to_git_script}
```

The exclamation mark before path is required.

Scripts:

* [git\_heroku\_add.sh](https://github.com/DVELP/cookbook/blob/master/scripts/git_heroku_add.sh)

  * Adds git remote url for heroku
  * Requires two parameters: remote_name and heroku_app_name
  * Example: `git_heroku_add.sh staging dvelp-staging`

* [git\_merge\_pull\_request.sh](https://github.com/DVELP/cookbook/blob/master/scripts/git_merge_pull_request.sh)

  * Merges and closes pull request created from current branch onto master
  * Requires current git branch to be the branch you want to merge to master
  * Takes no parameters
  * Example (from git repo directory): `git_merge_pull_request.sh`

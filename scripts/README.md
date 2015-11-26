# DVELP Scripts

A collection of shell scripts that we use at DVELP for our making the everyday more efficient.

For ease of use, we recommend first downloading the shell scripts, then adding an alias to them in your `~/.gitconfig`. For example:

```
[alias]
	add-heroku-remote = !${path_to_git_script}
```

N.B. An exclamation mark is required before the path.

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

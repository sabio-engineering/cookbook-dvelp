# Git && Shopify

Our quick guide to working collaboratively with Git, GitHub and Shopify projects.

## Create a Feature

Create a `staging` branch from `master`.

```
git checkout master
git pull
git checkout -b staging
```
If the staging branch already exists, rebase it on-top of master:

```
git checkout staging
git rebase master
```

Finally, push the staging branch to remote so we have a communal copy:
```
git push origin staging
```

## Production hotfix

If you need to make a hotfix on production, create a new, local branch off `master`.

```
git checkout master
git pull
git checkout -b hotfix-some-bug
```

Once you have fixed the bug, or added the small feature, create a new Pull Request to `master`.

For more information about writing good commits and creating Pull Requests, check-out our [guide to Git](https://github.com/DVELP/cookbook/blob/master/guides/Git.md).

## Merge staging with master

Once the featured is complete and all Pull Requests to staging have been merged, rebase `staging` on top of `master`, give it a final review and once your are happy, merge it in.

```
git checkout master
git pull
git checkout staging
git rebase -i master
git checkout master
git merge --ff-only staging
git push origin master
```

## Deploy to production

It's extremely important that we aim to mirror the master branch with the production code at all times, so once your new feature is on master, make sure you deploy it to production.

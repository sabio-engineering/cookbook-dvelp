# Git

## Maintain a Repo

* Avoid including files in source control that are specific to your development machine or process
* Perform work in a feature branch
* Rebase frequently to incorporate upstream changes
* Use a GitHub pull request for code reviews
* Delete local and remote feature branches after merging

## Write a Feature

Create a new, local branch off `master`.

```
git checkout master
git pull
git checkout -b ${branch_name} # (* - check fusnote)
```

Rebase frequently to incorporate upstream changes.

```
git fetch origin
git rebase origin/master
```

When feature is complete and tests pass, commit the changes.

```
git status
git add --all
git commit --verbose
```

Use the following template to write a [good commit message]:

    Present-tense summary under 50 characters

    * More information about commit (under 72 characters).
    * More information about commit (under 72 characters).

    http://project.management-system.com/ticket/123

If you've created more than one commit, use a rebase to squash them into cohesive commits with good messages:

    git rebase -i origin/master

Share your branch.

    git push origin ${branch_name}

Submit a pull request, assign it to code reviewer, add ‘needs_review’ label. (**)

[good commit message]: https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message

## Review Code

When someone else makes a pull request, you can review their changes.
Make comments and ask questions directly on lines of code in the GitHub web interface.

When finished, remove ‘needs_review’ label.

If you’re satisfied with the changes, or there are only minor styling issues, add ‘ship_it’ label.
If pull request contains bugs or several issues, add ‘pending_changes’ label.
If you think pull request changes are not needed at all, add ‘do_we_need_this?’ label.

Assign the pull request back to it's owner.

## Merge

Rebase interactively:

```
git checkout ${branch_name}
git fetch origin
git rebase -i origin/master
```
Squash commits like "Fix whitespace”, “Address comments”, etc. into one or a small number of valuable commit(s). Edit commit messages to reveal intent.

Force push your branch. This allows GitHub to automatically close your pull request and mark it as merged when your commit(s) are pushed to `origin/master`. It also makes it possible to [find the pull request] that brought in your changes.

[find the pull request]: http://stackoverflow.com/a/17819027

```
git diff --stat
git checkout master
git merge ${branch_name} --ff-only
git push
```

Delete your remote feature branch.

```
git push origin -d ${branch_name}
```

Delete your local feature branch.

```
git branch -d ${branch_name}
```

*****
*
###### Note that you can set shell variables like this `branch_name=“newsletter-signup”`, and run most of the commands without having to change anything. Here's the list of variables needed:

```
branch_name=“”
repo_name=“”
```

**
###### If labels in project are not set up properly, set them up by going to Pull Requests - Labels.
`https://github.com/DVELP/${repo_name}/labels`
*****

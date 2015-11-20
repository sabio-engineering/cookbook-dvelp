#!/bin/bash -e

branch_name=`git symbolic-ref HEAD`
branch_name=${branch_name##refs/heads/}

if [ "$branch_name" == "master" ]; then
  echo "You're on master branch, checkout feature branch you want to merge"
  exit 1
fi

echo "git fetch origin"
git fetch origin

echo "git rebase origin/master"
git rebase origin/master

echo "git push -f"
git push -f

echo "git checkout master"
git checkout master

echo "git merge $branch_name"
git merge $branch_name

echo "git push"
git push

echo "git push origin --delete ${branch_name}"
git push origin --delete ${branch_name}

echo "git branch -d ${branch_name}"
git branch -d ${branch_name}

echo "All is well!"

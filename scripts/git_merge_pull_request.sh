#!/bin/bash -e

feature_branch=`git symbolic-ref HEAD`
feature_branch=${feature_branch##refs/heads/}
target_branch='master'
verbose='false'

while getopts 'b:' flag; do
  case "${flag}" in
    b) target_branch=${OPTARG} ;;
    v) verbose='true' ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

if [ "$feature_branch" == $target_branch ]; then
  echo "You're on $target_branch branch, checkout feature branch you want to merge"
  exit 1
fi

echo "git fetch origin"
git fetch origin

echo "git rebase origin/${target_branch}"
git rebase origin/$target_branch

echo "git push -f"
git push -f

echo "git checkout ${target_branch}"
git checkout $target_branch

echo "git merge $feature_branch"
git merge $feature_branch

echo "git push"
git push

echo "git push origin --delete $feature_branch"
git push origin --delete $feature_branch

echo "git branch -d $feature_branch"
git branch -d $feature_branch

echo "$feature_branch has been merged into ${target_branch}. All is well!"

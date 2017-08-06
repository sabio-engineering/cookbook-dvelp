#!/bin/bash -e
verbose='false'

branch_name=`git symbolic-ref HEAD`
branch_name=${branch_name##refs/heads/}
target_branch='master'

while getopts 'b:' flag; do
  case "${flag}" in
    b) target_branch=${OPTARG} ;;
    v) verbose='true' ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

if [ "$branch_name" == $target_branch ]; then
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

echo "git merge $branch_name"
git merge $branch_name

echo "git push"
git push

echo "git push origin --delete $branch_name"
git push origin --delete $branch_name

echo "git branch -d $branch_name"
git branch -d $branch_name

echo "$branch_name has been merged into ${target_branch}. All is well!"

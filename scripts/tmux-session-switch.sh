#!/usr/bin/env zsh
set -e

if [[ -z $1 ]]; then
  tmux switch-client -l
else
  if tmux has-session -t "$1" 2>/dev/null; then
    [[ -z "$TMUX" ]] && tmux attach -t "$1" || tmux switch-client -t "$1"
  else
    if [[ -z "$TMUX" ]]; then
      tmux attach -t "$1"
    else
      TMUX=`tmux new-session -d -s "$1"`
      tmux switch-client -t "$1"
    fi
  fi
fi


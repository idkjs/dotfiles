#!/usr/bin/env fish
mkdir -p $HOME/dotstow
set -x STOW_DIR $HOME/dotstow
# Just stow stuff
set targets git kitty nvim tmux hammerspoon
echo $targets

for target in $targets
    mkdir -p $STOW_DIR/$target
    stow "$target"
end


#!/usr/bin/env fish
# File: fish-install.fish
# Author: Philippe Schottey

# what does calling this first do
# gets this error
# BUG in find_stowed_path? Absolute/relative mismatch between Stow dir
# dotfiles and path /Users/mandalarian/.dotfiles/.DS_Store at /usr/local/Cellar/stow/2.3.1//Library/Perl/5.28/Stow.pm line 966, <DATA> line 22.
stow fish
curl https://git.io/fisher --create-dirs -sLo ~/.config/fish/functions/fisher.fish
fisher install jorgebucaran/gitio.fish
fisher install tokozedg/notes
fisher install jethrokuan/fzf

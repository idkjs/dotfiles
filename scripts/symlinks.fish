#!/usr/bin/env fish
set symlinks $HOME/dotfiles/symlinks

function symlinks
    ln -nFs $symlinks/.editorconfig $HOME/.editorconfig
    ln -nFs $symlinks/.inputrc $HOME/.inputrc
    ln -nFs $symlinks/.vimrc $HOME/.vimrc
    ln -nFs $symlinks/.dircolors $HOME/.dircolors
    ln -nFs $symlinks/.hushlogin $HOME/.hushlogin
    ln -nFs $symlinks/.rigreprc $HOME/.rigreprc
    ln -nFs $symlinks/.wgetrc $HOME/.wgetrc
end

symlinks

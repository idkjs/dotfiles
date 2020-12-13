#!/usr/bin/env fish

set fish_source $HOME/dotfiles/fish
set fish_target $fish_target


function install_fisher
    curl https://git.io/fisher --create-dirs -sLo ~/.config/fish/functions/fisher.fish
    fisher install jorgebucaran/gitio.fish
    fisher install tokozedg/notes
    fisher install jethrokuan/fzf
end

function _install_fish
    mkdir -p $fish_target
    ln -nFs $fish_source/config.fish $fish_target/config.fish
    ln -nFs $fish_source/functions $fish_target/functions
    ln -nFs $fish_source/completions $fish_target/completions
    ln -nFs $fish_source/conf.d $fish_target/conf.d
    install_fisher
end

install_fish

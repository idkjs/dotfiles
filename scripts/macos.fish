#!/usr/bin/env fish
function macos
    function ask_for_sudo
        echo "Asking for administrator password up-front"
        sudo -v &>/dev/null

        # Update existing `sudo` time stamp
        # until this script has finished.
        #
        # https://gist.github.com/cowboy/3118588

        # Keep-alive: update existing `sudo` time stamp until script has finished
        bash -c 'while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &'

        echo "Password cached"
    end

    ask_for_sudo
    source $HOME/dotfiles/scripts/macos_settings.fish
end
macos

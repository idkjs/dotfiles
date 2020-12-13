#!/usr/bin/env fish
set DOTFILES $HOME/dotfiles

if test ! (which brew)
    /usr/bin/ruby -e "(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
end

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

brew install git

printf "url=https://github.com" | git -c "credential.helper=osxkeychain" credential fill | git -c "credential.helper=osxkeychain" credential approve

brew tap Homebrew/bundle
brew bundle

mkdir -p $HOME/.config/fish
ln -nFs $HOME/.dotfiles/fish/config.fish $HOME/.config/fish/config.fish
ln -nFs $HOME/.dotfiles/fish/functions $HOME/.config/fish/functions
ln -nFs $HOME/.dotfiles/fish/completions $HOME/.config/fish/completions
ln -nFs $HOME/.dotfiles/fish/conf.d $HOME/.config/fish/conf.d

set shell="/usr/local/bin/fish"

# for config in (fd . $DOTFILES/config -d 1 2>/dev/null)
#     set target "$HOME/.config/( basename "$config" )"

#     if [ -e "$target" ]; then
#         echo "~$target already exists... Skipping."
#     else
#         echo "Creating $config file"
#         cp -r $config $target
#     end
# end

if test ! (grep $shell /etc/shells)
    sudo bash -c "echo $shell >> /etc/shells"
end

if not test $SHELL = $shell
    chsh -s $shell
end
if not test $SHELL = $shell
and echo_err
or echo $argv
end
if not test (grep $shell /etc/shells)
and echo_err
or echo $argv
end
function testss
    if not test (grep $shell /etc/shells)
        sudo bash -c "echo $shell >> /etc/shells"
        echo_err
    end
end

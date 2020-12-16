#!/usr/bin/env fish
set Brewfile (PWD)/Brewfile

echo $Brewfile
set brewfile bash bash-completion direnv watchman exa envchain thefuck rsync git bat curl broot hivemind overmind stow cloc curl readline wget httpie dockutil exa fzf fd gh git-delta hub lazygit mas ripgrep fnm shellcheck sd ssh-copy-id tldr tmux trash neovim python vim eg-examples watchman legit jump z fish jq tree peco duti ag mycli sk universal-ctags
set casks rectangle firefox-developer-edition appcleaner firefox alacritty react-native-debugger suspicious-package transmission hammerspoon visual-studio-code postgres iterm2 postico "homebrew/services"

rm $Brewfile

function header
    echo 'tap "homebrew/bundle"' >> $Brewfile
    echo 'tap "homebrew/cask"' >> $Brewfile
    echo 'tap "homebrew/core"' >> $Brewfile
    echo \n >> $Brewfile
    # cask_args appdir: "/Applications", fontdir: "/Library/Fonts/"
    echo 'cask_args appdir: "/Applications", fontdir: "/Library/Fonts/"' >>$Brewfile
    echo \n >> $Brewfile
end

function _brewfile
    for formula in $brewfile
        echo ' brew "'$formula'" ' >>$Brewfile
    end
end

function _casks
    for cask in $casks
        echo ' brew "'$cask'" ' >>$Brewfile
    end
end

function generate
    header
    _brewfile
    _casks
    #  brew bundle cleanup:
    # Uninstall all dependencies not listed from the Brewfile.
    brew bundle cleanup
    # brew --dry-run  bundle $Brewfile

end

generate

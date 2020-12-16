#!/usr/bin/env fish

set brewfile direnv watchman exa envchain thefuck rsync git bat curl broot hivemind overmind stow cloc curl readline wget httpie dockutil exa fzf fd gh git-delta hub lazygit mas ripgrep fnm shellcheck sd ssh-copy-id tldr tmux trash neovim python vim eg-examples watchman legit jump z fish jq tree peco duti ag mycli sk universal-ctags
set casks alacritty react-native-debugger suspicious-package transmission hammerspoon visual-studio-code postgres iterm2 postico

echo $brewfile

for formula in $brewfile
    brew install $formula
    echo $status
end

for cask in $casks
    brew cask install $cask
    echo $status
end

PROJDIR := $(realpath $(CURDIR))

SHELL = /usr/local/bin/fish
# Decide whether the commands will be shown or not
VERBOSE = TRUE

.PHONY: all
all: stow

.PHONY: fishshell
fishshell:
    # install mac fish
	source scripts/install_fish.fish

    # install mac symlinks
	source scripts/symlinks.fish
    # install mac settings
	source scripts/macos.fish

.PHONY: curl_exists
curl_exists:
	@which curl || echo curl not installed;

.PHONY: computer
computer:curl_exists
	@which brew || 	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

	brew install git
	cd ./macos && brew bundle --no-upgrade
	# for some reason installing via the brewfile is failing for postico but works via terminal
	brew install postico

    fishshell

.PHONY: stow
stow:
	@stow -t ~ tmux .config git ripgrep vim nvim iterm wgetrc readline hammerspoon editorconfig curl dircolors hushlogin

.PHONY: unstow
unstow:
	@stow -D -t ~ tmux fish git ripgrep vim nvim iterm wgetrc readline hammerspoon editorconfig curl dircolors hushlogin


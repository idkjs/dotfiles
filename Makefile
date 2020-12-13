PROJDIR := $(realpath $(CURDIR))
SHELL = /bin/fish
.PHONY: all
all: stow
# Decide whether the commands will be shown or not
VERBOSE = TRUE

.PHONY: curl_exists
curl_exists:
	@if [ -z `which curl` ]; then echo curl not installed; false; fi

.PHONY: computer
computer:curl_exists
	@which brew || 	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

	brew install git
	cd ./macos && brew bundle --no-upgrade
	# for some reason installing via the brewfile is failing for postico but works via terminal
	brew install postico
    # install mac fish
	chmod +x ./scripts/install_fish.fish
    ./scripts/install_fish.fish
    # install mac symlinks
	chmod +x ./scripts/symlinks.fish
	./scripts/symlinks.fish
    # install mac settings
	chmod +x ./scripts/macos.fish
	./scripts/macos.fish
	stow -l

.PHONY: stow
stow:
	@stow -t ~ tmux .config git ripgrep vim nvim iterm wgetrc readline hammerspoon editorconfig curl dircolors hushlogin

.PHONY: unstow
unstow:
	@stow -D -t ~ tmux fish git ripgrep vim nvim iterm wgetrc readline hammerspoon editorconfig curl dircolors hushlogin


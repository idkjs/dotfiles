.PHONY: all
all: stow

.PHONY: curl_exists
curl_exists:
	@if [ -z `which curl` ]; then echo curl not installed; false; fi

.PHONY: computer
computer:curl_exists
	@which brew || 	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

	brew install git
	cd ./macos && brew bundle
	./macos/settings
	stow

.PHONY: stow
stow:
	@stow -t ~ tmux fish git ripgrep vim nvim iterm wgetrc readline hammerspoon editorconfig curl dircolors hushlogin

.PHONY: unstow
unstow:
	@stow -D -t ~ tmux fish git ripgrep vim nvim iterm wgetrc readline hammerspoon editorconfig curl dircolors hushlogin

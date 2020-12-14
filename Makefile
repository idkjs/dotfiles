PROJDIR := $(realpath $(CURDIR))

SHELL = /usr/local/bin/fish
# Decide whether the commands will be shown or not
VERBOSE = TRUE

.PHONY: all
all: fishshell

.PHONY: macos
macos:
    # install mac settings
	source scripts/macos.fish
.PHONY: configs
configs:
    # install .config files
	source scripts/install_config.fish

.PHONY: fishshell
fishshell:
    # install mac fish
	source scripts/install_fish.fish

    # install mac symlinks
	source scripts/symlinks.fish

    # install .config files
	source scripts/install_config.fish

.PHONY: curl_exists
curl_exists:
	@which curl || echo curl not installed;

.PHONY: install
install:curl_exists
	@which brew || 	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

	brew install git
	# for some reason installing via the brewfile is failing for postico but works via terminal
	brew install postico
	cd ./macos && brew bundle --no-upgrade
	macos
	fishshell

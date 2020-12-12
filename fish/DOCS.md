# Install fish shell
```bash
brew install fish
```
## — Add fish shell
```bash
echo “/usr/local/bin/fish” | sudo tee -a /etc/shells
```
### — Make fish shell to default shell for Terminal
```bash
chsh -s /usr/local/bin/fish
```

```bash
brew install ssh-copy-id tldr tmux trash tree wget wifi-password httpie youtube-dl thefuck watchman yarn-completion rbenv z gh erlang elixir autojump cocoapods jq sponge
```

```bash
brew cask install discord iterm2 hammerspoon firefox brave-browser charles chromium imageoptim postico postman postgres visual-studio-code android-platform-tool android-sd android-studio setapp docker react-native-debugger
```

```bash
abbr -g showhidden "defaults write com.apple.finder AppleShowAllFiles TRUE;killall Finder"
```

# didnt register add via terminal
# awscli
thefuck
vim
watchman

# Spoof MAC Address
cask wifispoof
wget
wifi-password
yarn, args: [ignore-dependencies]
yarn-completion
httpie  
youtube-dl
z

<!-- cocoapods -->
https://memorytin.com/2020/11/17/macos-big-sur-flutter-doctor-error/
<!-- Seems like you have to add the package with brew or some other thing. asdf doesnt not install it on machine, just manages the version -->
```asdf
asdf plugin add ruby
asdf plugin add erlang
asdf plugin add elixir
<!-- asdf install erlang 20.3.5 this fails -->
asdf install erlang 20.3
asdf local erlang 20.3.5
```

# rsync
```bash
rsync -avz server-config/ administrator@207.254.71.22.9:Downloads/server-config
rsync -avz iterm-pref/ administrator@207.254.71.22.9:Downloads/iterm-pref
defaults write com.apple.dt.Xcode ShowBuildOperationDuration YES
```

## Xcode `simctl` error

See:https://github.com/AnhTester/Automation/blob/79486b81559ffecad28cbd6c5a440c84334a1f90/docs/troubleshooting.md#L10

And https://stackoverflow.com/questions/29108172/xcrun-unable-to-find-simctl
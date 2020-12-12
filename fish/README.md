# Fish Shell Dotfiles

Requires [sk/skim](https://github.com/lotabout/skim)
`brew install skim`

## Installation

```bash
git clone https://github.com/idkjs/fish.git ~/.config/fish/
```

## url created with [gitio.fish](https://github.com/jorgebucaran/gitio.fish) awsm.fish=https://github.com/jorgebucaran/awesome.fish#readme

```sh
gitio fishconfig=https://raw.githubusercontent.com/idkjs/fish/master/.files
gitio myfish=https://github.com/idkjs/fish/blob/master/.files

gitio: can't git.io URL for this URL: "https://github.com/idkjs/fish/blob/master/.files"

# works
❯ gitio myfish=https://github.com/idkjs/fish#.files
https://git.io/myfish
```

Of course, this doesnt work because this repo is private. Just making a note.

⚡curl -L [git.io/fishconfig](https://git.io/fishconfig) | bash⚡

⚡curl -L [git.io/myfish](https://git.io/myfish) | bash⚡

## Resources

[fish-shell-completions](https://medium.com/@fabioantunes/a-guide-for-fish-shell-completions-485ac04ac63c)

[git-bare-ssh](https://gist.github.com/joahking/780877)

[PatrickF1/dotfiles for deployment](https://github.com/PatrickF1/dotfiles)

[quotes in fish docs](https://fishshell.com/docs/2.4/index.html#quotes)

[echo variable name is `\$HOME`](http://unix.stackexchange.com/questions/129084/ddg#129113)

[string-expansion](https://stackoverflow.com/questions/65132069/how-to-combine-text-with-expanded-variable-into-a-variable-expansion-in-fish)

[fish-article](https://mvolkmann.github.io/fish-article/)

[`wraps` doesnt tak an `=` sign](https://fishshell.com/docs/current/cmds/alias.html?highlight=wraps#example)

[use-exit-status-of-command-in-fish-function](https://dev.to/talha131/use-exit-status-of-command-in-fish-function-2lj1)

[The best way to store your dotfiles: A bare Git repository](https://www.atlassian.com/git/tutorials/dotfiles)

[fish-shell playground](https://rootnroll.com/d/fish-shell/)

[https://github.com/afq984/dotfiles](https://github.com/afq984/dotfiles)

[fishshell-gitter](https://gitter.im/fish-shell/fish-shell)

[Figglewatts/dotfiles](https://github.com/Figglewatts/dotfiles/blob/master/install.fish)

[using on remote machine](https://github.com/sky-bro/.dotfiles/blob/master/README.md)

[uses `set -l`/set local within function scope](https://github.com/tsujamin/dotfiles/blob/main/.config/fish/functions/dotfile.fish)

[pre-commit-hook](https://github.com/gazorby/fish-git-check-id/blob/master/functions/gckid.fish)

## License

[MIT](LICENSE.md)


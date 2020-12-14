# dotfiles using stow

Guided by [c-castillo/dotfiles](https://github.com/c-castillo/dotfiles)

## TLDR

[automatic installation script](https://dm.idkjs.vercel.app/install):

```bash
curl -fsSL https://dotfiles.idkjs.vercel.app/install | fish
```
```bash
git clone https://github.com/idkjs/dotfiles.git ~/.config
```

## TODO

Install [dag/vim-fish](https://github.com/dag/vim-fish) for fish syntax features in nvim.


## Resources

### .gitmessage
[Managing Dotfiles with GNU Stow](https://www.stevenrbaker.com/tech/managing-dotfiles-with-gnu-stow.html)

[stow-get](https://github.com/rcmdnk/stow-get)

[stow-manager](https://github.com/samba2/stow-manager)

[thoughbot:5-useful-tips-for-a-better-commit-message](https://thoughtbot.com/blog/5-useful-tips-for-a-better-commit-message)

[thoughbot:better-commit-messages-with-a-gitmessage-template](https://thoughtbot.com/blog/better-commit-messages-with-a-gitmessage-template)

[thoughbot:autosquashing-git-commits](https://thoughtbot.com/blog/autosquashing-git-commits)

[fish_update_completions generates completions](https://www.2daygeek.com/linux-fish-shell-friendly-interactive-shell/)

### Backing up dotfiles

[stow](https://www.gnu.org/software/stow/)

[using-gnu-stow-to-manage-your-dotfiles](http://brandon.invergo.net/news/2012-05-26-using-gnu-stow-to-manage-your-dotfiles.html)

[SO:how-to-list-files-directories-only-in-fishshell](https://stackoverflow.com/questions/37222484/how-to-list-files-directories-only-in-fishshell)

[gnu-stow-dotfiles](https://protesilaos.com/codelog/gnu-stow-dotfiles/)
---
title: "Manage dotfiles with GNU Stow"
subtitle: "Make your configs even more portable"
excerpt: "GNU Stow creates symlinks to predefined paths, based on the structure of the current working directory. Excellent for managing dotfiles."
date: 2018-01-13
permalink: https://protesilaos.com/codelog/gnu-stow-dotfiles/
---
GNU Stow is a program that, as far as I can tell, creates symlinks with predefined paths to your `$HOME`, based on the structure of the current working directory. It is very convenient for managing dotfiles, as it eliminates the need for manually copying changes to a dedicated, version-controlled repository. All one needs is to set up the necessary symlinks, and then any changes made to the files will be mirrored in the dotfiles' repo (then push changes to the remote repo).

## How it works

Here is an example of a directory structure with some configs:

```
dotfiles/
    directory-1/
        file-1
        file-2
    directory-2/
        other-file-1
        other-file-2
```

Say I want to have `file-1` and `file-2` with their proper paths in my `$HOME`. Using `stow` I just need to provide the first parent directory as an argument, as follows:

```sh
# First cd into the dotfiles
cd dotfiles

# Now create symlinks for file-1 and file-2
stow directory-1
```

That's it! The files will be placed at `$HOME/file-1` and `$HOME/file-2`.

## Organising by theme

Stow becomes very useful once we start using more complex path structures. I like to organise my directories by theme, adding the appropriate paths inside. Here is a practical example for `vim` and my basic `bspwm` desktop session:

```
dotfiles/
    bspwm/
        .config/
            bspwm/
                bspwmrc
            sxhkd/
                sxhkdrc
            polybar/
                config
                launch.sh
    vim/
        .vim/
            autoload/
                plug.vim
            spell/
                en.utf-8.add
                en.utf-8.add.spl
        .vimrc
```

The directories `dotfiles/bspwm` and `dotfiles/vim` are the *thematic* bundles I have created. Each directory's name serves as an argument for `stow`, which then proceeds to add all the enclosed directories/files to their designated paths. This practically means:

```sh
# First cd into the dotfiles
cd dotfiles

# Now create symlinks for bspwm
stow bspwm

# This will create the following structure inside your $HOME
$HOME/
    .config/
        bspwm/
            bspwmrc
        sxhkd/
            sxhkdrc
        polybar/
            config
            launch.sh

# Similarly for the vim theme
stow vim

# Which adds the following to $HOME
$HOME/
    .vim/
        autoload/
            plug.vim
        spell/
            en.utf-8.add
            en.utf-8.add.spl
    .vimrc
```

## Ultra-portable configs

Data portability is already great in GNU/Linux land. With GNU Stow it just becomes even easier to manage your configurations. It is particularly useful for quickly setting up a work environment on a clean install.

The one caveat is that `stow` will fail to create the symlinks if the directories/files already exist. So make sure you first double check the directory structures you intend to create symbolic links to.

Remember, `man` is your friend. And here is the 'mandatory' link to [my dotfiles](https://gitlab.com/protesilaos/dotfiles).



# alias dm='git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME'
# alias dm='git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'




function dm --wraps=git --description="dm:Git wrapper for dotfile management"
    set -l DOTFILES "$HOME/.dotfiles/"
   if not test -e "$DOTFILES"
        git init --bare "$DOTFILES"
        git --git-dir="$DOTFILES" --work-tree="$HOME" config status.showUntrackedFiles no
    end

    git --git-dir="$DOTFILES" --work-tree="$HOME" $argv
end

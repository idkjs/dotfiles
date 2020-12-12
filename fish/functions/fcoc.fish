# https://github.com/bryaan/dotfiles/blob/master/git/fish/search.fish
# TODO can we get colors from `git br --all` to passthru to skim?
# TODO maybe same thing as above must be applied here?
function fcoc -d "Fuzzy-find and checkout a commit"
  git log --pretty=oneline --abbrev-commit --reverse | sk --tac --no-sort --exact | \
    awk '{print $1;}' | xargs git checkout
end

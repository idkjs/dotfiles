# -d "https://stackoverflow.com/a/28776885/2336356"
abbr push -d "https://stackoverflow.com/a/28776885/2336356" "git push origin HEAD"

function git_add_and_commit_with_message
  set -g M "$argv"
  echo "$M"
  git add --all
  git commit -m $M
end

abbr acm 'git_add_and_commit_with_message'


# git get branches
function get_git_branches
    git branch -vv \
    | fzf --ansi \
    | awk '{print substr($0, 3, length($0))}' \
    | awk '{print $1}'
end

# git checkout
function gc
    git checkout (get_git_branches)
end

function _current_branch -d "gets current branch"
    echo (command git symbolic-ref HEAD ^/dev/null | sed -e 's|^refs/heads/||')
end

alias ggsup 'git branch --set-upstream-to=origin/(_current_branch)'
# git stage
function git_stage_list
    git status -s \
    | fzf --multi --ansi --tac \
    | awk '{if (NR==eof) printf "%s ", $2; else print $2}'
end

function gs
    git add (git_stage_list)
end


abbr gtd "git tag -d $1"

# https://github.com/bryaan/dotfiles/blob/master/git/fish/search.fish
# TODO can we get colors from `git br --all` to passthru to skim?
function fco -d "Fuzzy-find and checkout a branch"
  git branch --all | grep -v HEAD | string trim | sk | \
    while read branchName
      # TODO shouldn't this come *before* skim? Actually at very beginning?
      git fetch --all
      # The currently selected branch has a leading asterisk to indicate it is currently open,
      # This removes it so we have the path only.
      set -l branchName (echo $branchName | string replace '* ' '')
      switch $branchName
        case 'remotes/*/*'
          # In this case a remote branch was selected, a local copy will be made.
          # ie. most of the time it is `origin`
          set -l remoteName (echo $branchName | awk -F / '{ print $2 }')
          set -l remoteString "remotes/$remoteName/"
          set -l branchName (echo $branchName | string replace $remoteString '')
          # This works in the case: If the branch name you’re trying to checkout (a) doesn’t exist and (b) exactly matches a name on only one remote, Git will create a tracking branch for you:
          # So only when there is 1 remote pretty much. So lets make it more flexible with --track.
          # git checkout $branchName
          git checkout --track $remoteName/$branchName
          # Where --track is really short for:
          # git checkout -b $branchName $remoteName/$branchName
        case '*'
          # In this case it should be a local branch that was selected.
          git checkout $branchName
      end
    end
end

# TODO maybe same thing as above must be applied here?
function fcoc -d "Fuzzy-find and checkout a commit"
  git log --pretty=oneline --abbrev-commit --reverse | sk --tac --no-sort --exact | \
    awk '{print $1;}' | xargs git checkout
end

function gi
  set q $argv[1]

  curl -sLw n https://www.gitignore.io/api/+$q > .gitignore

end

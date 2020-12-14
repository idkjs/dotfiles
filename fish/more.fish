# search github .re/.ml files
function reml
  set query $argv
  echo $query
# https://github.com/search?q=Luv+extension%3Are+extension%3Aml&type=Code
  set url "https://github.com/search?q=$query+extension%3Are+extension%3Aml&type=Code"
  echo $url
  open $url
end

# search my github repos
function me -d "search my github repos"

 set q $argv[1]

 set url "https://github.com/search?q=user%3Aidkjs+$q"

  open $url

end


abbr ys "yarn start"
abbr yc "yarn clean"
abbr y "yarn"
abbr ns "npm start"
abbr nc "npm run clean"

function ya
    yarn add $argv
end

function yd
    yarn add -D $argv
end

function ni
    npm install $argv
end

function nd
    npm install --save-dev $argv
end

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

function gi
  set q $argv[1]

  curl -sLw n https://www.gitignore.io/api/+$q > .gitignore

end

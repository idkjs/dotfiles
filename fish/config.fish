# set up paths early
# function prepend_to_path -d "Prepend the given dir to PATH if it exists and is not already in it"
#     if test -d $argv[1]
#         if not contains $argv[1] $PATH
#             set -gx PATH "$argv[1]" $PATH
#         end
#     end
# end
prepend_to_path "/usr/local/opt/sqlite/bin"
prepend_to_path "/usr/local/opt/curl/bin"
prepend_to_path "/usr/local/opt/ruby/bin"
prepend_to_path "/bin"
prepend_to_path "/sbin"
prepend_to_path "/usr/bin"
prepend_to_path "/usr/sbin"
prepend_to_path "/usr/.local/bin"
prepend_to_path "/usr/local/bin"
# all these should be handled by previous statement
# prepend_to_path "/usr/local/bin/opam"
# prepend_to_path "/usr/local/bin/fnm"
# prepend_to_path "/usr/local/bin/qnm"
# prepend_to_path "/usr/local/bin/asdf"
# prepend_to_path "/usr/local/bin/autojump"
prepend_to_path /usr/local/opt/asdf/asdf.fish
# https://github.com/jethrokuan/fzf
prepend_to_path "$HOME/.fzf/bin"
prepend_to_path $HOME/.fzf/shell/key-bindings.fish

export TERM="xterm-256color"
alias vi nvim
alias vim nvim
set -x VISUAL_EDITOR code
set -x SHELL fish
# set -x BROWSER firefox
fish_vi_key_bindings

set -xU GITHUB_TOKEN (github-access-token)
# put github token in $HOME/.github_token so https://github.com/MoOx/npmpub can find it
echo (github-access-token) > $HOME/.github_token


# AWS settings
# set -x AWS_IAM_HOME "$HOME/.aws/iam"
# set -x AWS_CREDENTIALS_FILE "$HOME/.aws/credentials"

# [ -f /usr/local/share/autojump/autojump.fish ]; and . /usr/local/share/autojump/autojump.fish
# [ -f /usr/local/share/autojump/autojump.fish ]; and . /usr/local/share/autojump/autojump.fish
# [ -f /root/.autojump/share/autojump/autojump.fish ]; and . /root/.autojump/share/autojump/autojump.fish

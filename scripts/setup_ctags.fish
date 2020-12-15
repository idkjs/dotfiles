#!/usr/bin/env fish

# set EXPORT_DIR $HOME/dotfiles
set export_dir $HOME/dotfiles/git_template
# echo $export_dir
set target_dir $HOME/.git_template
# echo $target_dir


function installed
    echo -e " ✓ $argv already installed."
end

function setup_ctags -d "https://github.com/PezCoder/dotfiles/blob/5151163c658607dcf3bd56b36c02374858781d39/install.sh#L113-L123"
    test -d $target_dir
    and installed 'ctags git hooks'
    or git config --global init.templatedir '~/.git_template'
    git config --global alias.ctags '!.git/hooks/ctags'
    cp -R $export_dir $target_dir
end
setup_ctags

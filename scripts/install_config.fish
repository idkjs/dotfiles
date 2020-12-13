#!/usr/bin/env fish
set DOTFILES $HOME/dotfiles

function main
    # Creating symlinks for ~/.config
    for config in (fd . $DOTFILES/config -d 1 2>/dev/null)
        # echo (basename $config)
        set target $HOME/.config/(basename $config)
        echo "Creating symlink for $target"
        # echo "Creating symlink for $config"
        # if [ -e "$target" ]
        #     echo "~$target#$HOME already exists... Skipping."
        # else
        #     echo "Creating symlink for $config"
        #     ln -s "$config" "$target"
        # end
        ln -nFs $config $target;
        and echo Success! $target symlinked
        or error Symlinking to $config failed
    end
end

main

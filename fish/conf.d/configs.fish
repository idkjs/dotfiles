#!/usr/bin/env fish

set symlinks $HOME/dotfiles/symlinks

echo "Creating symlinks for $symlinks"
function main
    # Creating symlinks for ./symlinks
    # must pass the --hidden flag since our symlinks are defined usin .inputrc
    for config in (fd . $symlinks --hidden -d 1 2>/dev/null)

        set source_file $symlinks/(basename $config)
        set target $HOME/(basename $config)

        echo "Creating symlink for $source_file at $target"

        ln -nFs $source_file $target
        and echo Success! $target symlinked
        or error Symlinking to $config failed
    end
end

main

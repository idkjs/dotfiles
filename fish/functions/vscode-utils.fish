set extension_file $HOME/.vscode/extensions.txt
function vscode_save_extensions --on-event sync_vscode_extensions -d "Saves all installed extensions to $extension_file"
  code --list-extensions > $extension_file
end

function vscode_install_extension -d "Wraps `code --install-extension` and saves all installed extensions to $extension_file"
  code --install-extension $argv
  emit sync_vscode_extensions
end

function vscode_sync_extensions -d "Syncs vscode extensions with $extension_file"
  # TODO only install extensions that are not installed already
  # TODO warn if installed extension does not exist in $extension_file
  while read -la extension
    code --install-extension $extension
  end < $extension_file
end

function vscode_symlink_settings
  switch (uname)
  case Darwin
    set code_path "$HOME/Library/Application Support/Code"
  case Linux
    set code_path $HOME/.config/Code/User/settings.json
  case '*'
    echo "No vscode path configured for (uname)"
    exit 1
  end

  set target $code_path/User/settings.json

  if test -L $target
    echo "Symlink already exists at $target"
  else
    echo "Symlinking vscode settings to $target"
    rm $target
    ln -s ~/.vscode/settings.json $target
  end
end

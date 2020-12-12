function findkill
    find . -name node_modules -type d -prune -print -exec rm -rf '{}' +
end
# https://dev.to/trilon/how-to-delete-all-nodemodules-folders-on-your-machine-43dh
# dry run
function finddry
    find . -name node_modules -type d -prune -print | xargs du -chs
end


function clean
    cd $HOME/Github/ && echo $PWD && findkill
    echo $PWD
    cd $HOME/Downloads/ && echo $PWD && findkill
    echo $PWD
end

# dry run
function cleandry

    cd $HOME/Github/ && echo $PWD && finddry
    cd $HOME/Downloads/ && echo $PWD && finddry

end

function nuke
 set these="lib .bsb-lock .merlin node_modules build _build _esy esy.lock"
  echo deleting "$these"

  rm -rf lib .bsb-lock .merlin node_modules build _build _esy esy.lock && bsb -clean-world

end

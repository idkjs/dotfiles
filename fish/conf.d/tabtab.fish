
# tabtab source for tabtab package
# uninstall by removing these lines or running `tabtab uninstall tabtab`
set tabtab /usr/local/lib/node_modules/qnm/node_modules/tabtab/.completions/tabtab.fish

test -f $tabtab
and echo $tabtab > ~/.config/fish/completions/tabtab.fish
or echo qnm is not installed\. Run `npm i --global qnm`

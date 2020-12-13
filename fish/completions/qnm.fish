# https://github.com/ranyitz/qnm/issues/58#issuecomment-743870730
function _tabtab_completion
  set cmd (commandline -opc)
  set cursor (commandline -C)
  set completions (eval env DEBUG=\"" \"" COMP_CWORD=\""$cmd\"" COMP_LINE=\""$cmd \"" COMP_POINT=\""$cursor\"" tabtab completion -- $cmd)

  for completion in $completions
    echo -e $completion
  end
end

complete -f -d 'tabtab' -c tabtab -a "(eval _tabtab_completion)"


# function .runsudo --description 'Run current command as sudo.'
# https://github.com/drhayes/drfish/blob/main/functions/.runsudo.fish
function plz --description 'Run current command as sudo.'
  commandline -C 0
  commandline -i 'sudo '
  commandline -f execute
end

bind \es plz

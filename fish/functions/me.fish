# search my github repos
function me -d "search my github repos"

 set q $argv[1]

 set url "https://github.com/search?q=user%3Aidkjs+$q"

  open $url

end

# search github .re/.ml files
function reml
  set query $argv
  echo $query
# https://github.com/search?q=Luv+extension%3Are+extension%3Aml&type=Code
  set url "https://github.com/search?q=$query+extension%3Are+extension%3Aml&type=Code"
  echo $url
  open $url
end

# search my github repos
function me -d "search my github repos"

 set q $argv[1]

 set url "https://github.com/search?q=user%3Aidkjs+$q"

  open $url

end


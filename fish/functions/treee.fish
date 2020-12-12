function treee
  set
  tree -aC -I '.git|node_modules|bower_components|.tmp|tmp|dist|lib' --dirsfirst $argv | less -FRNX;
end

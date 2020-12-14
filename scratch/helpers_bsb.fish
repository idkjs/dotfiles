abbr bsbc "npx bsb -clean-world"
abbr bsbm "npx bsb -make-world"
abbr bsbw "BS_WATCH_CLEAR=true npxbsb -make-world -w"

abbr last_edited_re "fd -e re --exec stat -f "%m%t%N" | sort -nr | head -1 | cut -f2"

function fmt
    # set -g F "$argv"
    bsrefmt --in-place $last_edited_re
end

function fmt1 -d "format one passed in .re/.ml file"
    bsrefmt --in-place $argv
end

function addmlre
    jq '.scripts += {format: "bsrefmt"}' package.json | sponge package.json
    jq '.scripts += {mlre: "bsrefmt --parse ml --print re --interface false"}' package.json | sponge package.json
    jq '.scripts += {reml: "bsrefmt --parse re --print ml --interface false"}' package.json | sponge package.json

    #  jq '.scripts += {format: "bsrefmt"},{mlre: "bsrefmt --parse ml --print re --interface false"}{reml: "bsrefmt --parse re --print ml --interface false"}' bsconfig.json | sponge bsconfig.json
end


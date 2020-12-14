abbr ys "yarn start"
abbr yc "yarn clean"
abbr y "yarn"
abbr ns "npm start"
abbr nc "npm run clean"

function ya
    yarn add $argv
end

function yd
    yarn add -D $argv
end

function ni
    npm install $argv
end

function nd
    npm install --save-dev $argv
end


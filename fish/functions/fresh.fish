# refresh fish from git repo
function fresh
    rm -rf ~/.config/fish
    git clone https://github.com/idkjs/fish.git ~/.config/fish/
end

# Keychain to manage gpg-agent and ssh-agent
if which keychain >/dev/null ^&1
    eval (keychain --eval)
end

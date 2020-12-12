# turn hidden files on/off in Finder
# toggle AppleShowAllFiles
function toggleHidden -d "toggles system hidden files show or hide"
    if test (defaults read com.apple.finder AppleShowAllFiles) = "TRUE"
        defaults write com.apple.finder AppleShowAllFiles FALSE
        echo hidden file set to (defaults read com.apple.finder AppleShowAllFiles)
    else
        defaults write com.apple.finder AppleShowAllFiles TRUE
        echo hidden file set to (defaults read com.apple.finder AppleShowAllFiles)
    end
    killall Finder
end

#!/usr/bin/env fish
# set dotfiles (PWD)/.dotfiles
# set symlinks (PWD)/symlinks
# −F If the proposed link (link_name) already exists and is a directory,
#  then remove it so that the link may occur.
# The −F option should be used with either −f or −i options.
# If none is specified, −f is implied. The −F option is a no-op unless −s option is specified.
# mkdir -p $HOME/.config/fish
# ln -nFs $HOME/.dotfiles/fish/config.fish $HOME/.config/fish/config.fish
# ln -nFs $HOME/.dotfiles/fish/functions $HOME/.config/fish/functions
# ln -nFs $HOME/.dotfiles/fish/completions $HOME/.config/fish/completions
# ln -nFs $HOME/.dotfiles/fish/conf.d $HOME/.config/fish/conf.d

# set cmd ls symlinks
# set links (eval $cmd)
# # for link in $links
# #     echo Backing up link $link
# #     set fname (realpath -s P $link)
# #     echo Backing up fname $fname
# #     echo Backing up
# # end
# # set data (cat $links | string split0)
# # echo DATA $data
# echo LINKS $links
# function install
#     for link in $links
#         echo dotfiles link is $link
#         set fname $HOME/$link
#         echo fname is $fname
#         # set cmd cat $BN
#         # echo (eval $cmd)
#         # cat $HOME/$fname
#         # set fname $HOME/$link
#         set rp (realpath $HOME/$link)
#         echo  $rp
#         echo  (cat $rp)
#         if test -f (cat $rp)
#             and echo "Backing up existing $rp"
#             echo  (realpath $HOME/$link)
#             mv $rp $rp.original
#             or echo " $rp doesnt exist, creating link"
#         end
#         # if test -f $fname
#         #     and echo "Backing up existing $fname"
#         #     echo  (realpath $HOME/$link)
#         #     mv $fname $fname.original
#         #     or echo " $fname doesnt exist, creating link"
#         # end
#         # mv $fname $fname.original
#         # echo "Sim linking $fname"
#         # ln -nFs $symlinks/$fname ~/.$fname
#         # stow -n
#     end
# end
# function isfile
#     set file $argv
#     if test -z $file
#         echo "Specify note file."
#         return
#     else
#         echo file $file
#     end
# end

# set symlinks (PWD)/symlinks/
# set links (ls $symlinks)

# echo $links
# install
function install
    ln -nFs $HOME/dotfiles/symlinks/.editorconfig $HOME/.editorconfig
    ln -nFs $HOME/dotfiles/symlinks/.inputrc $HOME/.inputrc
    ln -nFs $HOME/dotfiles/symlinks/.vimrc $HOME/.vimrc
    ln -nFs $HOME/dotfiles/symlinks/.dircolors $HOME/.dircolors
    ln -nFs $HOME/dotfiles/symlinks/.hushlogin $HOME/.hushlogin
    ln -nFs $HOME/dotfiles/symlinks/.rigreprc $HOME/.rigreprc
    ln -nFs $HOME/dotfiles/symlinks/.wgetrc $HOME/.wgetrc

end

install

" A minimal vimrc for new vim users to start with.
"
" Referenced here: http://www.benorenstein.com/blog/your-first-vimrc-should-be-nearly-empty and
" https://gist.github.com/r00k/8fc7e4e9d35ccbfb64aa

" Original Author:	 Bram Moolenaar <Bram@vim.org>
" Made more minimal by:  Ben Orenstein
" Last change:	         2012 Jan 20
"
" To use it, copy it to
"     for Unix and OS/2:  ~/.vimrc
"  for MS-DOS and Win32:  $VIM\_vimrc
"
"  If you don't understand a setting in here, just type ':h setting'.

" Switch syntax highlighting on
syntax on

" Make backspace behave in a sane manner.
set backspace=indent,eol,start

" Enable file type detection and do language-dependent indenting.
filetype plugin indent on


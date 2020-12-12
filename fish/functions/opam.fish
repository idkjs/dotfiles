function opamc
    # reset the opam environment
    echo eval (opam config env)
    echo eval (opam config --shell fish env)
end

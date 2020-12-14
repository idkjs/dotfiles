# ssh-copy-id to remote machine

## Set up Host

The mini referred to below is a reference to a `Host configuration` in `~/.ssh/config`. The config was added automatically using [`ssheditor`](https://www.hejki.org/ssheditor/) but could easily be written by hand.

```bash
Host mini
	User administrator
	HostName 207.254.71.229
	#SCEPassword CCE4FD19-6896-4C0D-8F31-DD7C1BC0AF63
	#SCETerminal com.googlecode.iterm2
```


```bash
 ssh-copy-id -f -i '/Users/mandalarian/.ssh/id_rsa.pub' mini
[I] mandalarian@mandalarian ~>
 ssh-copy-id -f -i '/Users/mandalarian/.ssh/id_rsa.pub' mini
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/mandalarian/.ssh/id_rsa.pub"
Password:

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh 'mini'"
and check to make sure that only the key(s) you wanted were added.

[I] mandalarian@mandalarian ~> ssh mini
Last login: Mon Dec 14 13:26:32 2020 from 82.124.42.159
Welcome to fish, the friendly interactive shell
Type `help` for instructions on how to use fish
administrator@9404 ~>


```

---
layout: post
title: Fixing Git Object Permissions
description: "Fixing .git/object file permissions using hooks."
modified: 2013-12-04
categories:
    - articles
    - programming
tags:
    - git
    - permissions
comments: true
image:
  feature: texture-feature-02.jpg
---

I've recently become more annoyed with permissions issues in a git repository that I have set up on my personal box. Every time someone commits changes, some files within

{% highlight bash %}
/path/to/repository.git/objects
{% endhighlight %}
    
end up having the owner set to the user who made the commit, but that's not what I want. The goal is to have a single `git` user and group with permissions to all the files, and to add users who should have access to the repository to the `git` group.

Today I decided to tackle this problem via [git hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks).

Before we go on, I want to acknowledge the fact that I'm no git administration expert, and you should **follow this approach at your own risk**.

With that being set, here's what I did to address the problem:

### Give our `git` user permissions to alter permissions:

You'll need to add the following lines to your sudoers file in order for your `git` user to be able to make the necessary permissions changes:

{% highlight bash %}
%git ALL=(ALL) NOPASSWD: /bin/chgrp -R git *
%git ALL=(ALL) NOPASSWD: /bin/chmod -R 670 *
%git ALL=(ALL) NOPASSWD: /bin/chown -R git\:git *
{% endhighlight %}
    
If you've never altered your sudoers file before, you can begin editing it with vim by entering

{% highlight bash %}
sudo visudo
{% endhighlight %}
    
Note: We're technically giving anyone in the `git` group permissions to alter permissions on **any** file, but they can only set permission to the `git` group. However with this in place, anyone in the git group can alter any files permissions to give themselves access to it! This isn't a great idea, but admittedly I was struggling with restricting the permissions to my `git` user's home directory, so I left it here.
    
### Update permissions from git hooks

Use the following script to alter an already-created git repository, adding hook logic to update the permissions.

{% highlight bash %}
#!/bin/bash
# sets up a permissions git hook

DIR=$1
if [ -z "$DIR" ]; then
    echo "Need to supply a directory."
    exit 1
fi

change_permissions() {
    echo "sudo /bin/chgrp -R git *" >> $1
    echo "sudo /bin/chmod -R 670 *" >> $1
    echo "sudo /bin/chown -R git:git *" >> $1
    sudo /bin/chmod a+x $1
}

change_permissions $DIR/hooks/applypatch-msg
change_permissions $DIR/hooks/commit-msg
change_permissions $DIR/hooks/post-commit
change_permissions $DIR/hooks/post-receive
change_permissions $DIR/hooks/post-update
change_permissions $DIR/hooks/pre-applypatch
change_permissions $DIR/hooks/pre-commit
change_permissions $DIR/hooks/pre-rebase
change_permissions $DIR/hooks/update
{% endhighlight %}
    
Once you've created the script and given it execute permissions via

{% highlight bash %}
sudo chmod a+x /path/to/my/script.sh
{% endhighlight %}
    
you're ready to run it. Execute the script using a command like

{% highlight bash %}
/path/to/my/script.sh /path/to/repository.git
{% endhighlight %}

After that, committing to the repository should now fire off the `chgrp`, `chmod`, and `chown` commands that we've applied using our script, effectively resetting all permissions back to our `git` user.

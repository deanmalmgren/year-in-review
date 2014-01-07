This project contains a collection of scripts to analyze the number of
meetings, emails, code commits, etc throughout the year as a way to
reflect on the year.

Getting started
---------------

* Install [Vagrant](http://vagrantup.com),
  [Fabric](http://fabric.readthedocs.org/en/latest/installation.html),
  and [fabtools](http://fabtools.readthedocs.org/en/latest/).

* From the command line, run `fab dev vagrant.up provision`. This will
  create a virtual machine with all the necessary packages.

* Add a `year-in-review.ini` configuration file to the root of this
  repository with the necessary information (see below for details).

* SSH to the virtual machine with `vagrant ssh year-in-review` and run
  `make` from the `/vagrant` directory. This will run all of the
  analyses that are set up in your `year-in-review.ini` configuration file.


year-in-review.ini
------------------

```ini
# the twitter API credentials can be obtained from
# https://dev.twitter.com/apps
[twitter]
consumer_key=xxxx
consumer_secret=xxxx
access_token=xxxx
access_token_secret=xxxx

# authentication information for google
[google]
email=xxxx
password=xxxx

# credentials for authenticating to github
[github]
username=xxxx
password=xxxx
```

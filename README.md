year-in-review
==============

Collection of scripts to analyze number of meetings, emails, code
commits, etc throughout the year.

Getting started
===============

* Install [Vagrant](http://vagrantup.com),
  [Fabric](http://fabric.readthedocs.org/en/latest/installation.html),
  and [fabtools](http://fabtools.readthedocs.org/en/latest/).

* From the command line, run `fab dev vagrant.up provision`. This will
  create a virtual machine with all the necessary packages.

* Add a `year-in-review.ini` configuration file to the root of this
  repository with the necessary information.

* SSH to the virtual machine with `vagrant ssh year-in-review` and run
  `make` from the `/vagrant` directory. This will run all of the
  analyses that are set up in your `year-in-review.ini` configuration file.

The overarching goal of this project is to make it easy for others to
answer a very simple question I'm asked all the time: "what is a
typical day like for you?"

There are lots of ways to answer this question. `year-in-review` takes a
first stab by doing the obvious thing of coallating data from
publicly available APIs and visualizing the results in a simple
way. This makes it easy for others to understand the fraction of your
time you spend coding, writing emails, or in meetings for example.

At this point, `year-in-review` consists of a collection of scripts that
produce an output file for
[every API that is configured](#configuration) and a simple web
interface for viewing them that looks something like this:

TODO insert screenshot when available

Depending on interest, future versions may provide a python package
for downloading/manipulating all of the information, a django app, a
flask app, or perhaps even be a standalone web app. 

Getting started
---------------

* Install [Vagrant](http://vagrantup.com),
  [Fabric](http://fabric.readthedocs.org/en/latest/installation.html),
  and [fabtools](http://fabtools.readthedocs.org/en/latest/).

* From the command line, run `fab dev vagrant.up provision`. This will
  create a virtual machine with all the necessary packages.

* [Configure this project to download your data](#configuration).

* SSH to the virtual machine with `vagrant ssh year-in-review` and run
  `make` from the `/vagrant` directory. This will run all of the
  analyses that are set up in your `year-in-review.ini` configuration file.

* To view the results, go into `/vagrant/web` and execute the
  `run_server` script. Then point your browser to
  http://localhost:8000

Configuration
-------------

`year-in-review` reads an INI file in the standardized format from
the root of the repository. For the time being, the file must be
called `year-in-review.ini` and it must be located at the root of this
repository. Fill out any of the following sections of your INI file to
have the data available at the conclusion of the analysis:

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

# after creating an application for the google API console,
# you can get these from the google API console
# https://code.google.com/apis/console/
# the calendar_id is usually the same as the email address you need
[gcal]
application_name=xxxx
api_key=xxxx
client_id=xxxx
client_secret=xxxx
calendar_id=xxxx

# credentials for authenticating to github
[github]
username=xxxx
password=xxxx

# stackoverflow only requires a user_id which you can get by visiting your
# user page. For example, http://stackoverflow.com/users/564709/dino has
# user_id=564709
[stackoverflow]
user_id=xxxx

# obtain timeseries of private mercurial repositories on arbitrary
# servers specified in ssh_config_path by specifying an email address
# and comma-separated list of
# host:/path/to/parent/directory/of/repository pairs.
[mercurial]
ssh_config_path=/path/to/.ssh/config
email=xxxx
host_directories=machine:/directory/containing/hg/repos,machine2:/directory/containing/hg/repos
```

Contributing
------------

This project is still very much in its infancy and code will likely
change frequently and without notice for a little while. If you'd like
to pitch in, [let me know](https://twitter.com/deanmalmgren); I'd be
happy to help you get started on any of the
[outstanding issues](./issues).

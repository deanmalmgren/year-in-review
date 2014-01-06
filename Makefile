# this page is really helpful for understanding "automatic variables"
# http://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html
# quick guide:
#
#  $< stands for first dependency
#  $^ stands for all dependencies
#  $@ stands for the target
#  $? what does the fox stand for? http://youtu.be/jofNR_WkoCE

# set some global variables here


# by default run all of these commands
all: twitter \
	gmail \
	gcal \
	github \
	stackoverflow \
	mercurial

# remove all of the results
clean: 
	rm -rf data/

twitter: data/twitter.dat

data/twitter.dat: bin/twitter.py
	python $< > $@

gmail:

gcal:

github:

stackoverflow:

mercurial:

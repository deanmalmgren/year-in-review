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

twitter: data/twitter.csv
data/twitter.csv: bin/download_twitter.py
	python $< > $@

gmail: data/gmail.csv
data/gmail.csv: bin/download_gmail.py
	python $<

gcal: data/gcal.csv
data/gcal.csv: bin/download_gcal.py
	python $< > $@

github: data/github.csv
data/github.csv: bin/download_github.py
	python $< > $@

stackoverflow: data/stackoverflow.csv
data/stackoverflow.csv: bin/download_stackoverflow.py
	python $< > $@

mercurial: data/mercurial.csv
data/mercurial.csv: bin/download_mercurial.py
	python $< > $@

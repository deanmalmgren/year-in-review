#!/usr/bin/env python
"""Use this script to download a timeseries of calendar events from
the Google using the credentials specified in year-in-review.ini.
"""

# standard library
import os
import sys
import csv
import httplib2
import datetime
from pprint import pprint

# third party
import gflags
from apiclient.discovery import build
from oauth2client.file import Storage
from oauth2client.client import OAuth2WebServerFlow
from oauth2client.tools import run
from dateutil.parser import parse as date_parse
# local
import utils

# authenticate to the API
config_parser = utils.get_config_parser()
if not config_parser.has_section('gcal'):
    sys.stderr.write(utils.yellow(
        "google is not configured; skipping...\n"
    ))
    exit(0)

# this is ripped from
# https://developers.google.com/google-apps/calendar/instantiate
FLAGS = gflags.FLAGS
FLOW = OAuth2WebServerFlow(
    client_id=config_parser.get('gcal', 'client_id'),
    client_secret=config_parser.get('gcal', 'client_secret'),
    scope='https://www.googleapis.com/auth/calendar',
    user_agent=config_parser.get('gcal', 'application_name'),
)

# To disable the local server feature, uncomment the following line:
FLAGS.auth_local_webserver = False

# If the Credentials don't exist or are invalid, run through the native client
# flow. The Storage object will ensure that if successful the good
# Credentials will get written back to a file.
storage = Storage('data/calendar_credentials.dat')
credentials = storage.get()
if credentials is None or credentials.invalid == True:
    credentials = run(FLOW, storage)

# Create an httplib2.Http object to handle our HTTP requests and authorize it
# with our good Credentials.
http = httplib2.Http()
http = credentials.authorize(http)

# Build a service object for interacting with the API. Visit
# the Google Developers Console
# to get a developerKey for your own application.
service = build(serviceName='calendar', version='v3', http=http,
                developerKey=config_parser.get('gcal', 'api_key'))

# get all of the events and write them to disk
writer = csv.writer(sys.stdout)
writer.writerow(['datetime', 'duration', 'attendees'])
page_token = None
while True:
    events = service.events().list(calendarId=config_parser.get('gcal', 'calendar_id'), pageToken=page_token).execute()
    for event in events['items']:

        # find start time. ignore events that are all day events (and
        # have 'date' instead of 'dateTime' keys)
        try:
            start = date_parse(event['start']['dateTime'], ignoretz=True)
        except KeyError:
            continue

        # find duration
        end = date_parse(event['end']['dateTime'], ignoretz=True)
        dt = end-start
        hours = dt.seconds/3600.

        # find list of attendees
        attendees=[]
        for attendee in event.get('attendees', []):
            try:
                attendees.append(attendee['email'])
            except KeyError:
                pass

        writer.writerow([start, hours, ','.join(attendees)])
    page_token = events.get('nextPageToken')
    if not page_token:
        break

import os
import ConfigParser

def bin_root():
    return os.path.dirname(os.path.abspath(__file__))

def project_root():
    return os.path.dirname(bin_root())

def get_config_parser():
    parser = ConfigParser.RawConfigParser()
    parser.read(os.path.join(project_root(), "year-in-review.ini"))
    return parser
    

#!/usr/bin/env python
''' preens the data files and filters word lists'''

import logging
import sys, os
WORD_LEN_LIMIT = 5
FILE_NAME = '3000.txt'
REL_PATH = 'data'

def preen(filepath):
    '''filters words in input file by length and writes words longer than the predetermined length to output file '''
    fullFileName = os.path.join(filepath, FILE_NAME)
    logging.info('Trying to open %s', fullFileName)
    lines = None
    with open(fullFileName, 'r') as inputFile:
        lines = inputFile.readlines()
    logging.info('Read %d lines', len(lines))
    filtered = [l[:-1] for l in lines if WORD_LEN_LIMIT < len(l)]
    logging.info('%d lines after filtering',len(filtered))
    outfile_name = fullFileName + '.out'
    logging.info('Writing to out file ... %s', outfile_name)
    with open(outfile_name, 'w') as outfile:
        for item in filtered:
            outfile.write("%s\n" % item)
        logging.info('Written to %s.', outfile_name)
    return

def main(argv):
    fullPath = os.path.join(os.path.dirname(__file__), REL_PATH)
    preen(fullPath)
    return

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(message)s')

    main(sys.argv)

__author__ = "Gytha Ogg"
__copyright__ = "Gytha Ogg"
__credits__ = ["Gytha Ogg"]
__license__ = "MIT"
__version__ = "0.1"
__maintainer__ = "Gytha Ogg"
__email__ = "gythaoggscat@gmail.com"
__status__ = "development"

#!/usr/bin/env python
''' preens the data files and filters word lists'''
import logging
import sys

__author__ = "Gytha Ogg"
__copyright__ = "Gytha Ogg"
__credits__ = ["Gytha Ogg"]
__license__ = "MIT"
__version__ = "0.1"
__maintainer__ = "Gytha Ogg"
__email__ = "gythaoggscat@gmail.com"
__status__ = "development"

WORD_LEN_LIMIT = 5
FILE_NAME = 'data/3000.txt'


def preen(filename=FILE_NAME):
    '''
    filters words in input file by length and
    writes words longer than the predetermined length
    to output file
    '''
    logging.info('Trying to open %s', filename)
    lines = None
    with open(filename, 'r') as input_file:
        lines = input_file.readlines()
        logging.info('Read %d lines', len(lines))
        filtered = [l[:-1] for l in lines if WORD_LEN_LIMIT < len(l)]
        logging.info('%d lines after filtering', len(filtered))
        outfile_name = filename + '.out'
        logging.info('Writing to out file ... %s', outfile_name)
    with open(outfile_name, 'w') as outfile:
        for item in filtered:
            outfile.write("%s\n" % item)
            logging.info('Written to %s.', outfile_name)
    return


def main(argv):
    '''
    main method
    '''
    filename = FILE_NAME
    print argv, len(argv)
    if len(argv) > 0:
        filename = argv[0]
    preen(filename)
    return


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG,
                        format='%(asctime)s %(levelname)s %(message)s')

    main(sys.argv[1:])


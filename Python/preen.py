#!/usr/bin/env python
''' preens the data files and filters word lists'''
import logging
import sys
import string
__author__ = "Gytha Ogg"
__copyright__ = "Gytha Ogg"
__credits__ = ["Gytha Ogg"]
__license__ = "MIT"
__version__ = "0.1"
__maintainer__ = "Gytha Ogg"
__email__ = "gythaoggscat@gmail.com"
__status__ = "development"

WORD_LEN_LIMIT = 6
FILE_NAME = 'data/5kWords.txt'


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
        # discard short words (shorter than WORD_LEN_LIMIT)
        # save words in lowercase
        filtered = [l[:-1].lower()
                    for l in lines if WORD_LEN_LIMIT < len(l)]
        logging.info('%d lines after removing short words', len(filtered))
        # remove duplicates
        filtered = list(set(filtered))
        logging.info('%d lines after removing duplicates', len(filtered))
        outfile_name = filename + '_MIN_'+str(WORD_LEN_LIMIT)+'.out'
        logging.info('Writing to out file ... %s', outfile_name)

    with open(outfile_name, 'w') as outfile:
        for item in filtered:
            if any(letter not in string.ascii_letters for letter in item):
                logging.info('REJECTED %s.', item)
            else:
                outfile.write("%s\n" % item)
                logging.debug('Written %s to %s.', item, outfile_name)
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
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s %(levelname)s %(message)s')

    main(sys.argv[1:])

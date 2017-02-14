import logging
import sys


def main(argv):
    '''
    main method
    '''
    print argv, len(argv)
    if len(argv) > 0:
        filename = argv[0]
        with open(filename, 'r') as input_file:
            lines = [l.strip() for l in input_file.readlines()]
            js_array = str(lines)
            logging.debug(js_array)
    else:
        print '''+++ Divide By Cucumber Error.
        Please Reinstall Universe And Reboot +++'''
    return


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG,
                        format='%(asctime)s %(levelname)s %(message)s')

    main(sys.argv[1:])

#!/usr/bin/env python
''' Selects a random word from words.txt.out and scrambles the letters inside the word in various ways'''
__author__ = "Gytha Ogg"
__copyright__ = "Gytha Ogg"
__credits__ = ["Gytha Ogg"]
__license__ = "MIT"
__version__ = "0.1"
__maintainer__ = "Gytha Ogg"
__email__ = "gythaoggscat@gmail.com"
__status__ = "development"

import logging
import sys, os
import random
import string
import time
WORD_LEN_LIMIT = 5
FILE_NAME = 'words.txt.out'
REL_PATH = 'data'

def alpha_shuffle(word):
    ''' alphabetically sorts the letters between the first and last letter of a word '''
    alpha_shuffled = word[0]+''.join(sorted(word[1:-1]))+word[-1]
    logging.debug('%s has been shuffled to %s', word, alpha_shuffled)
    return alpha_shuffled

def random_shuffle(word):
    ''' randomly sorts the letters between the first and last letter of a word '''    
    mid_section = [letter for letter in word[1:-1]]
    random.shuffle(mid_section)
    random_shuffled = word[0] + ''.join(mid_section) + word[-1]
    logging.debug('%s has been shuffled to %s', word, random_shuffled)
    return random_shuffled

def get_word_list(n):
    ''' gets n words from the input file'''
    fullPath = os.path.join(os.path.dirname(__file__), os.path.join(REL_PATH, FILE_NAME))
    wordList = random.sample(open(fullPath).readlines(),n)
    logging.debug('Selected words: %s',wordList)
    return [string.rstrip(w) for w in wordList]

def sample_test():
    wordList = get_word_list(5)
    for word in wordList:
        logging.info('Original: %s, Alpha shuffle: %s, Random shuffle: %s', word,  alpha_shuffle(word), random_shuffle(word))
    return

def quiz():
    word_list = get_word_list(10)
    answer=''
    score = []
    time_taken = []
    for word in word_list:
        print string.upper(random_shuffle(word)), ' -- Enter the correct word: '
        start = time.time()
        answer = raw_input()
        end = time.time()
        time_taken.append(end-start)
        answer = string.strip(answer)
        if string.lower(answer) == string.lower(word):
            score.append(1)
        else:
            score.append(0)
    performance_analysis(word_list, time_taken, score)

def performance_analysis(word_list, time_taken, score):
    time_correct = 0
    n_correct = 0
    time_wrong = 0
    n_wrong=0
    for w,t,s in zip(word_list, time_taken, score):
        if 0 == s:
            time_wrong += t
            n_wrong += 1
            print string.upper(w), t, ' seconds --- INCORRECT'
        else:
            time_correct += t
            n_correct += 1
            print string.upper(w), t, ' seconds'
    print 'Score: ',sum(score), '/', len(score)
    print 'Total time taken: ' ,sum(time_taken), ' seconds'
    print 'Average time taken per word: ', sum(time_taken)/len(time_taken), ' seconds'
    if 0 is not n_correct :
        print 'Average time taken per correct answer', time_correct/n_correct
    if 0 is not n_wrong:
        print 'Average time taken per wrong answer', time_wrong/n_wrong
    
        
def main(argv):
    log_level = logging.WARNING
    if 'debug' in argv:
        log_level = min(log_level,logging.DEBUG)
    
    if 'test' in argv:
        log_level = min(log_level, logging.INFO)

    logging.basicConfig(level=log_level,
                        format='%(asctime)s %(levelname)s %(message)s')
        
    if 'test' in argv:
        sample_test()
    elif 'quiz' in argv:
        quiz()
    return

if __name__ == "__main__":
    main(sys.argv)

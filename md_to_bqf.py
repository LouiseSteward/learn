# -----------------------------------------------------------------------------
# Author: Louise Steward
# Date: Oct 2019
# Description: Automatically convert the quiz markdown files into corresponding
# bqf files. Should not be run as a standalone script - rather it is called as
# an option from the output script, since the bookfolder variable is coming
# from the output script.
# -----------------------------------------------------------------------------


import os
import re


def get_metadata(src_path, src_lines):
    '''
    Create the metadata line for the BQF file using
    the book title from the titlepage, and the 
    quiz title from the quiz md.
    '''

    # get the book title from the titlepage file
    title_src = open(src_path + '0-1-titlepage.md', 'r')
    title_src_lines = title_src.readlines()

    for i in range(len(title_src_lines)):
        if '{:.titlepage-title}' in title_src_lines[i]:
            # the title of the book is in the line above this include
            book_title = title_src_lines[i - 1].strip('\n')

    title_src.close()

    # get the name of the quiz from the quiz md file
    quiz_title = src_lines[1].strip('\n').replace('title: ', '')

    # correctly format the dst meta
    dst_meta = 'title: {}. {} \n\n\n'.format(book_title, quiz_title)

    return dst_meta


def get_questions(src_lines):
    '''
    Start at the line with the first question and pair with its answers
    Send these lines to format_question() and append the output to the
    dst lines list.
    '''

    dst_lines = []

    # get all of the question lines
    question_ind_list = [i for i, s in enumerate(src_lines)
                         if re.match(r'\d+\.[\t\s]', s[:4]) is not None]

    # bundle each question line with its mcq options
    for i in range(len(question_ind_list)):
        if i == len(question_ind_list) - 1:
            q_and_a = src_lines[question_ind_list[i]:]
        else:
            q_and_a = src_lines[question_ind_list[i]:question_ind_list[i + 1]]

        # format the question and mcq options
        formatted_q_and_a = format_question(q_and_a)

        # add them to the output list
        dst_lines += formatted_q_and_a

    return dst_lines


def format_question(question_lines):
    '''
    Uses some simple regex to strip the unnecessary parts from the 
    question and answer lines to match the required dst format
    '''
    question, answers = question_lines[0], question_lines[1:]

    # format the question by removing the numbering etc.
    formatted_question = question[re.search(r'\d+\.[\t\s]', question).end():]

    # format the answer by stripping preceding whitespace
    formatted_answer_list = []
    for answer in answers:
        if '+' in answer or '-' in answer:  # exclude empty lines etc.
            answer_text = answer[re.search('[-+]', answer).start():]
            formatted_answer_list.append(answer_text)

    # put them back in a list
    dst_mcq = [formatted_question] + formatted_answer_list + ['\n']

    return dst_mcq


def get_quiz_file_list(src_path):
    '''
    Get the list of quiz markdown files from the book text directory
    '''
    md_file_list = []

    for file in os.listdir(src_path):
        # exclude quiz-answers.md
        if re.match(r'quiz-\d\d\.md', file) is not None:
            md_file_list.append(file)

    md_file_list = sorted(md_file_list)

    return md_file_list


def main():
    # get the bookfolder variable from the output script
    bookfolder = os.environ['bookfolder']

    src_path = bookfolder + '/text/'
    dst_path = bookfolder + '/bqf/'

    md_file_list = get_quiz_file_list(src_path)

    for n, file in enumerate(md_file_list):
        src = open(src_path + file, 'r')
        src_lines = src.readlines()

        dst = open(dst_path + 'quiz-{}.bqf'.format(n + 1), 'w')

        dst.write(get_metadata(src_path, src_lines))

        dst_lines = get_questions(src_lines)

        for line in dst_lines:
            dst.write('{}'.format(line))

        src.close()
        dst.close()


main()

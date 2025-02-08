'''
model_sqlite3
'''

import flashcard
import sqlite3


DB_FILE = 'database.db'

class Model_sqlite:
    def __init__(self):
        '''
        Initialized db
        '''
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        
        try:
            cursor.execute("select * from flashcards")
        except sqlite3.OrerationalError:
            cursor.execute("create table flashcards (question, answer)")
        finally:
            cursor.close()
        
        def insert(self, flashcard):
            '''
            Inserts a card into database
            '''

            card_data = flashcard.get_data()

            connection = sqlite3.connect(DB_FILE)
            cursor = connection.cursor()

            cursor.execute("insert into flashcards (question, answer) \
                           values (:question, :answer)", card_data)
            
            connection.commit()
            cursor.close
            return True
        
        def select(self):
            '''
            Retrieves flashcards from database
            '''

            connection = sqlite3.connect(DB_FILE)
            cursor = connection.cursor()
            cursor.execute("select * from flashcards")

            return cursor.fetchall() 


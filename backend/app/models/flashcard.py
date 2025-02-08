"""
Flashcard.py
"""

import model_sqlite3


class Flashcard:
    def __init__(self, question: str, answer: str):
        self.data = {"question": question, "answer": answer}

    def get_question(self):
        '''
        Returns the question of a flashcard
        '''
        return self.data["question"]
    
    def get_answer(self):
        '''
        Returns the answer of a flashcard
        '''
        return self.data["answer"]
        
    def get_data(self):
        '''
        Returns the entire flashcard
        '''
        return self.data
    

# Test data

test_card1 = Flashcard("What is Flask?", "A lightweight Python web framework.")
test_card2 = Flashcard("What is React?", "A JavaScript library for building UIs.")

deck_db = Model_sqlite()
deck_db.insert(test_card1)
deck_db.insert(test_card2)

# flashcards = [test_card1.get_data(), test_card2.get_data()]

def get_all_flashcards():
    flashcards = []
    model = Model_sqlite()
    rows = model.select()
    for row in rows:
        card = Flashcard(row[0], row[1])
        flashcards.append(Flashcard.get_data())
    return flashcards   

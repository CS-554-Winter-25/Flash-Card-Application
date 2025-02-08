"""
Flashcard.py
"""

class flashcard:
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
        
    def __str__(self):
        '''
        Displayes the entire flashcard
        '''
        return f"Question: {self.get_question}\nAnswer: {self.get_answer}"
    
 
test_card1 = flashcard("What is Flask?", "A lightweight Python web framework.")
test_card2 = flashcard("What is React?", "A JavaScript library for building UIs.")
flashcards = [test_card1, test_card2]

def get_all_flashcards():
    return flashcards   
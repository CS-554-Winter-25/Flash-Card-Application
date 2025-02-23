import { useState } from 'react';
import axios from 'axios';

function FlashcardForm() {
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', topic_id: 1 });

  const handleAddFlashcard = () => {
    if (newFlashcard.question && newFlashcard.answer) {
      axios
        .post('http://127.0.0.1:5000/flashcard/', newFlashcard)
        .then(() => alert('Flashcard added successfully!'))
        .catch((error) => console.error('Error adding flashcard:', error));
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Question"
        value={newFlashcard.question}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
      />
      <input
        type="text"
        placeholder="Answer"
        value={newFlashcard.answer}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
      />
      <button onClick={handleAddFlashcard}>Add Flashcard</button>
    </div>
  );
}

export default FlashcardForm;

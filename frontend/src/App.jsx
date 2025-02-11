import { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching message:', error));

    axios.get('http://127.0.0.1:5000/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleFlip = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedFlashcards = [...flashcards];
      updatedFlashcards[editingIndex] = newFlashcard;
      setFlashcards(updatedFlashcards);
      setEditingIndex(null);
    } else {
      setFlashcards(prev => [...prev, newFlashcard]);
    }
    setNewFlashcard({ question: '', answer: '' });
  };

  const handleEdit = (index) => {
    setNewFlashcard(flashcards[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  return (
    <div>
      {currentPage !== 'landing' && (
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'landing' ? (
        <div>
          <h1>{message}</h1> 
          <div className="nav-btn-container">
            <button onClick={() => setCurrentPage('view')} className="nav-btn">View Flashcards</button>
            <button onClick={() => setCurrentPage('edit')} className="nav-btn">Edit Flashcards</button>
          </div>
        </div>
      ) : (
        <div>
          {currentPage === 'edit' && (
            <FlashcardForm
              newFlashcard={newFlashcard}
              setNewFlashcard={setNewFlashcard}
              handleSubmit={handleSubmit}
              editingIndex={editingIndex}
            />
          )}

          <FlashcardList
            flashcards={flashcards}
            flipped={flipped}
            handleFlip={handleFlip}
            currentPage={currentPage}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default App;

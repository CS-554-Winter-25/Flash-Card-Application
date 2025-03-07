import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFlashcardsByTopic } from '../components/ApiCall';
import Flashcard from '../components/Flashcard/Flashcard';

const keys = {
  up: 'ArrowUp',
  down: 'ArrowDown', 
  left: 'ArrowLeft', 
  right: 'ArrowRight'
}

function Study() {
  const { topic } = useParams();
  const [mode, setMode] = useState('sequential')
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [numCorrect, setNumCorrect] = useState(0)

  useEffect(() => { 
    const fetchFlashcards = async () => {
      try {
        const response = await fetchFlashcardsByTopic(topic);
        setFlashcards(response)
      } catch (error) {
        console.error('Error fetching all topics:', error);
      }
    };

    fetchFlashcards();
  }, []); 

  const handleKeyPress = (event) => {
    // Prevent screen from moving up/down on up/down arrow keys
    if (event.key === keys.down || event.key === keys.up)  { event.preventDefault() }

    setCurrentIndex((prevIndex) => {
      if (event.key === keys.right) {
        if (prevIndex + 1 < flashcards.length) return prevIndex + 1
        else return prevIndex
      }
      else if (event.key === keys.left) {
        if (prevIndex - 1 >= 0) return prevIndex - 1
        else return prevIndex
      }
      else {
        return prevIndex
      }
    })

    setNumCorrect((prevNumCorrect) => {
      if (event.key === keys.up) {
        if (prevNumCorrect <= flashcards.length - 1) return prevNumCorrect + 1
        else return prevNumCorrect
      }
      else if (event.key === keys.down) {
        if (prevNumCorrect - 1 >= 0) return prevNumCorrect - 1
        else return prevNumCorrect
      }
      else {
        return prevNumCorrect
      }
    })
  };

  useEffect(() => {
    const keydownListener = (event) => handleKeyPress(event);
    window.addEventListener('keydown', keydownListener);
    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  }, [flashcards]); // removing leads to stale state issue; handleKeyPress references flashcards array

  return (
    <div>
      {flashcards.length > 0 ? (
        <div>
          <button onClick={() => setMode('sequential')}>Sequential</button>
          <button onClick={() => setMode('spaced repetition')}>Spaced Repetition</button>
          <p>current mode: {mode}</p>
          {mode === 'sequential' && <p>use up arrow to mark card correct, down for incorrect</p>}

          <h1>Topic: {topic}</h1>
          {mode === 'sequential' && <h3>number correct: {numCorrect}</h3>}
          <div className="flashcards-container">
            {flashcards.length > 0 && (
              <Flashcard
                card={flashcards[currentIndex]}
                key={flashcards[currentIndex].id}
              />
            )}
          </div>
        </div>
      ) : (
        <p>No flashcards for this topic</p>
      )}
    </div>
  );
}

export default Study;
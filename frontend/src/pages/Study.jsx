import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFlashcardsByTopic } from '../components/ApiCall';
import Flashcard from '../components/Flashcard/Flashcard';

function Study() {
  const { topic } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)

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
    setCurrentIndex((prevIndex) => {
      if (event.key === 'ArrowRight') {
        if (prevIndex + 1 < flashcards.length) return prevIndex + 1
        else return prevIndex
      }
      else if (event.key === 'ArrowLeft') {
        if (prevIndex - 1 >= 0) return prevIndex - 1
        else return prevIndex
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
          <h1>Study {topic}</h1>
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
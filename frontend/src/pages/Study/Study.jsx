import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFlashcardsByTopic } from '../../components/ApiCall';
import Flashcard from '../../components/Flashcard/Flashcard';
import './Study.css';

// TODO: move to separate file?
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
  const [indexChanged, setIndexChanged] = useState(true)

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
      let newIndex = prevIndex
      if (event.key === keys.right) {
        if (prevIndex + 1 < flashcards.length) {
          setIndexChanged(true)
          newIndex = prevIndex + 1
        }
      }
      else if (event.key === keys.left) {
        if (prevIndex - 1 >= 0) {
          setIndexChanged(true)
          newIndex = prevIndex - 1
        }
      }
      else {
        setIndexChanged(false)
      }
      return newIndex
    })

    setNumCorrect((prevNumCorrect) => {
      console.log(indexChanged)
      if (event.key === keys.up) {
        if (prevNumCorrect <= flashcards.length - 1 && indexChanged === true) {
          setIndexChanged(false)
          return prevNumCorrect + 1
        }
        else return prevNumCorrect
      }
      else if (event.key === keys.down && indexChanged === true) {
        if (prevNumCorrect - 1 >= 0) {
          setIndexChanged(false)
          return prevNumCorrect - 1
        }
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
      flashcards.length > 0 ? (
        <div className='container'>
          <div className='info-container'>
            <h1>{topic}</h1>
            <div className='buttons-container'>
              <button onClick={() => setMode('manual')}>Manual</button>
              <button onClick={() => setMode('spaced repetition')}>Spaced Repetition</button>
            </div>
          </div>
          {mode === 'sequential' && <h3>number correct: {numCorrect}/{flashcards.length}</h3>}
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
      )
  );
}

export default Study;
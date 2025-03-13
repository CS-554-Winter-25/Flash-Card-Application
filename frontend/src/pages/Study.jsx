import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFlashcardsByTopic } from '../components/ApiCall';
import Flashcard from '../components/Flashcard/Flashcard';
import './Study.css'

const keys = {
  up: 'ArrowUp',
  down: 'ArrowDown', 
  left: 'ArrowLeft', 
  right: 'ArrowRight'
}

const accuracyColorClasses = [
  { range: [0, 25], colorClass: 'low-acc'},
  { range: [25, 75], colorClass: 'medium-acc'},
  { range: [75, 100], colorClass: 'high-acc' }
]

function Study() {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState('manual')
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsMarked, setCardsMarked] = useState(0)
  const [numCorrect, setNumCorrect] = useState(0)
  const [accuracy, setAccuracy] = useState(null)

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

  // Move to App.jsx ?
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    if (cardsMarked > 0) {
      setAccuracy((numCorrect / cardsMarked) * 100)
      }
  }, [numCorrect, cardsMarked])

  const handleKeyPress = (event) => {
    // Prevents screen from moving up/down on up/down arrow keys 
    if (event.key === keys.down || event.key === keys.up)  { event.preventDefault() }

    setCurrentIndex((prevIndex) => {
      if (event.key === keys.right && prevIndex + 1 < flashcards.length) {
        return prevIndex + 1
      }
      else if (event.key === keys.left && prevIndex - 1 >= 0) {
        return prevIndex - 1
      }
      return prevIndex
    })

    setNumCorrect((prevNumCorrect) => {
      let newNumCorrect = prevNumCorrect
      if (event.key === keys.up && prevNumCorrect < flashcards.length) {
        newNumCorrect = prevNumCorrect + 1
      }
      else if (event.key === keys.down && prevNumCorrect > 0) {
        newNumCorrect = prevNumCorrect - 1
      }
      return newNumCorrect
    })

    let newCardsMarked = 0
    setCardsMarked((prevCardsMarked) => {
      if ((event.key === keys.up || event.key === keys.down) && prevCardsMarked < flashcards.length) {
        newCardsMarked = prevCardsMarked + 1
        return newCardsMarked
      }
      return prevCardsMarked
    })
  };

  const accuracyColor = () => {
    for (const { range, colorClass } of accuracyColorClasses) {
      if (accuracy >= range[0] && accuracy <= range[1]) {
        return colorClass;
      }
    }
    return ''; // Default class if accuracy is out of range
  };

  useEffect(() => {
    const keydownListener = (event) => handleKeyPress(event);
    window.addEventListener('keydown', keydownListener);
    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  }, [flashcards]); // removing leads to stale state issue; handleKeyPress references flashcards array

  return (
    <div className='study-container'>
      {flashcards.length > 0 ? (
        <div className='study-page'>
          <h1>{topic}</h1>
          <div className='study-page-btns'>
            <button onClick={() => setMode('manual')}>Manual</button>
            <button onClick={() => setMode('spaced repetition')}>Spaced Repetition</button>
          </div>
          <div style={{ visibility: mode === 'manual' ? 'visible' : 'hidden' }}>
            <p>Press up key to mark cards correct, down key to mark incorrect</p>
            <h3>Accuracy:  
              <span className={`accuracy-span ${(cardsMarked === 0) ? 'black' : accuracyColor()}`}> {(cardsMarked === 0) ? '---' : `${Number(accuracy).toFixed(0)}%`} </span></h3>
          </div>
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
        <div className='study-page'>
          <h3>No flashcards for this topic</h3>
          <button onClick={() => navigate('/AddFlashcard')}>Add flashcards</button>
        </div>
      )}
    </div>
  );
}

export default Study;
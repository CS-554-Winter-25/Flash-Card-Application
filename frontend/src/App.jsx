import { useState, useEffect} from 'react'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({}); // Track flipped state per card

  useEffect(() => {
    // Make the GET request to Flask API (ensure the URL is correct)
    axios.get("http://127.0.0.1:5000")  // Flask's endpoint
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error fetching the message!", error);
      });

    axios.get("http://127.0.0.1:5000/flashcards")
      .then(response => setFlashcards(response.data))
      .catch(error => console.error("Error fetching flashcards:", error));
  }, []);


  // Toggle flip state for a specific card
  const handleFlip = (index) => {
    setFlipped(prevState => ({ ...prevState, [index]: !prevState[index] }));
  };
  
  return (
    <div>
      <h1>{message}</h1>
      <h2>Flashcards</h2>
      <div className="flashcard-container">
        {flashcards.map((card, index) => (
          <div 
            key={index} 
            className={`flashcard ${flipped[index] ? "flipped" : ""}`} 
            onClick={() => handleFlip(index)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <p><strong>Q:</strong> {card.question}</p>
              </div>
              <div className="flashcard-back">
                <p><strong>A:</strong> {card.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App

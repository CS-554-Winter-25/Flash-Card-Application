import { useState } from 'react'

function Flashcard({ card }) {
  if(!card) return null;
  const [isFlipped, setIsFlipped] = useState(false); 

  return (
    <div className="flashcard-wrapper">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
        onClick={() => setIsFlipped((isFlipped) => !isFlipped)}> 
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p><strong>Q:</strong> {card.question}</p>
          </div>
          <div className="flashcard-back">
            <p><strong>A:</strong> {card.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
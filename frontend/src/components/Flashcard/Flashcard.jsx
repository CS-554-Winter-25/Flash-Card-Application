// Flashcard renders a single flashcard with a front and back.
// The front displays the question, and the back displays the answer.
// If the card is clicked, it flips to reveal the other side.
import { useState } from 'react'

function Flashcard({ card }) {
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
      {/* {currentPage === 'edit' && (
        <div className="flashcard-buttons">
          <button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(index); }}>Edit</button>
          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>Delete</button>
        </div>
      )} */}
    </div>
  );
}

export default Flashcard;
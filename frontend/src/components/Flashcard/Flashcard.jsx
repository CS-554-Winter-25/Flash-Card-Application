import { useState } from 'react'
import { Edit, IdCard, Trash } from 'lucide-react';
import EditFlashcard from '../../pages/EditFlashcard';
import { handleDeleteFlashcard } from '../ApiCall';

function Flashcard({ card, onDelete, onUpdate }) {
  if(!card) return null;
  const [isFlipped, setIsFlipped] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };
//save is working but not redicrecting to home page
  const handleSave = (updatedCard) => {
    onUpdate(card.id, updatedCard);
    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await handleDeleteFlashcard(card.id);
      console.log('Flashcard deleted:', card.id);
      onDelete(card.id);
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="flashcard-wrapper">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
        onClick={() => setIsFlipped((isFlipped) => !isFlipped)}> 
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p><strong>Q:</strong> {card.question}</p>
            <div className="flashcard-actions">
              <button onClick={handleEdit}>
                <Edit size={18} />
              </button>
              <button onClick={ handleDelete }>
                <Trash size={18} />
              </button>
            </div>
          </div>
          <div className="flashcard-back">
            <p><strong>A:</strong> {card.answer}</p>
          </div>
        </div>
      </div>
      {isEditing && (
        <EditFlashcard
          card={card}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

export default Flashcard;
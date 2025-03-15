import { useState } from 'react'
import { Edit, IdCard, Trash } from 'lucide-react';
import EditFlashcard from '../../pages/EditFlashcard';
import { handleDeleteFlashcard } from '../ApiCall';

function Flashcard({ card, onDelete, onUpdate }) {
  if(!card) return null;
  const [isFlipped, setIsFlipped] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', topic_id: '' });
  const [topicIdInput, setTopicIdInput] = useState(card.topic_id);
  

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
      await handleDeleteFlashcard(
        card.id,
        setFlashcards,
        setNewFlashcard,
        topicIdInput
      );
      console.log('Flashcard deleted:', card.id);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  }

  return (
    <div className="flashcard-wrapper">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
        onClick={() => setIsFlipped((isFlipped) => !isFlipped)}> 
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p>{card.question}</p>
            <div className="flashcard-actions">
              <button className='edit-icon' onClick={handleEdit}>
                <Edit size={20} />
              </button>
              <button className='delete-icon' onClick={ handleDelete }>
                <Trash size={20} />
              </button>
            </div>
          </div>
          <div className="flashcard-back">
            <p>{card.answer}</p>
          </div>
        </div>
      </div>
      {isEditing && (
        <EditFlashcard
          card={card}
          onSave={handleSave}
          onCancel={() => {
            console.log('Canceled clicked in editflashcard form')
            setIsEditing(false)
          }}
        />
      )}
    </div>
  );
}

export default Flashcard;
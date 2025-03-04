import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleUpdateFlashcard, handleDeleteFlashcard } from '../components/ApiCall.jsx';
import { useAppContext } from "../AppContext";

function EditFlashcard( {card} ) {
    const navigate = useNavigate();
    const [editedFlashcard, setEditedFlashcard] = useState({ question: card.question, answer: card.answer, topic_id: card.topic_id });
    const [topicName, setTopicName] = useState('');
    const [topicIdInput, setTopicIdInput] = useState(card.topic_id);
    const { topics } = useAppContext
    return (
        <div>
            <h2>Edit Flashcard</h2>
                <input
            type="text"
            placeholder="Enter flashcard question"
            value={editedFlashcard.question}
            onChange={(e) => setEditedFlashcard({ ...editedFlashcard, question: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter flashcard answer"
            value={editedFlashcard.answer}
            onChange={(e) => setEditedFlashcard({ ...editedFlashcard, answer: e.target.value })}
          />
          <button
            onClick={ async () => {
              try {
                await handleUpdateFlashcard(card.id, editedFlashcard, setEditedFlashcard);
                } catch (error) {
                  console.error('Error updating flashcard:', error);
              }
              handleUpdateFlashcard(
                flashcardId,
                editedFlashcard,
                setTopicData,
                topicData,
                editingIndex,
                setEditingIndex,
                setCurrentPage
              );
            }}
          >
            Save Changes
          </button>
          <button onClick={() => setCurrentPage('view-by-topic')}>Cancel</button>
          {/*
          <button onClick={ async () => {
            try {
              await handleDeleteFlashcard(card.id);
              navigate('/');
            } catch (error) {
              console.error('Error deleting flashcard:', error);
            }
          }}>Delete</button>
          */}
        </div>
      )}

export default EditFlashcard
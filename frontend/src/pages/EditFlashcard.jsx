import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleUpdateFlashcard, handleDeleteFlashcard } from '../components/ApiCall.jsx';
import { useAppContext } from "../AppContext";
import axios from 'axios';

function EditFlashcard( {card, onCancel} ) {
  const navigate = useNavigate();
  const [updatedFlashcard, setupdatedFlashcard] = useState({ question: card.question, answer: card.answer, topic_id: card.topic_id });
  const [topicName, setTopicName] = useState('');
  const [topicIdInput, setTopicIdInput] = useState(card.topic_id);
  const [editingIndex, setEditingIndex] = useState(null);
  const [topicData, setTopicData] = useState({ id: '', topicName: '', flashcards: []});
  const { topics } = use_AppContext();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async () => {
    try {
      await handleUpdateFlashcard(card.id, updatedFlashcard, topicData, editingIndex, setEditingIndex);
      setSuccessMessage('Flashcard updated successfully!');
      console.log('Flashcard updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/ViewFlashcardsByTopicName');
      }, 2000);
    } catch (error) {
      console.error('Error updating flashcard:', error);
    } 
  }   

    
  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2 style={styles.header}>Edit Flashcard</h2>
        <input
          type="text"
          placeholder="Enter flashcard question"
          value={updatedFlashcard.question}
          onChange={(e) => setupdatedFlashcard({ ...updatedFlashcard, question: e.target.value })}
          style={styles.input}
        />    
        <input
          type="text"
          placeholder="Enter flashcard answer"
          value={updatedFlashcard.answer}
          onChange={(e) => setupdatedFlashcard({ ...updatedFlashcard, answer: e.target.value })}
          style={styles.input}
        />
        <button
          onClick={ async () => {
            try {
              await handleUpdateFlashcard(
                card.id,
                updatedFlashcard,
                setTopicData,
                topicData,
                editingIndex,
                setEditingIndex
              );
              window.location.reload();
            } catch (error) {
                console.error('Error updating flashcard:', error);
            }
          }}
          style={{ ...styles.button, ...styles.saveButton }}
        >
          Save Changes
        </button>
        <button onClick={() => {
          console.log('Clicked Cancel');
          onCancel();
        }}
          style={{ ...styles.button, ...styles.cancelButton }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// Will port this to the CSS file later
const styles = {
  modal: {
    display: 'block',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingTop: '60px'
  },
  modalContent: {
    backgroundColor: '#263238',
    width: '300px',
    height: '200px',
    margin: '10% auto',
    padding: '20px',
    border: '1px solid #888',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '18px'
  },
  input: {
    width: '100%',
    padding: '5px',
    margin: '5px 0',
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px'
  },
  saveButton: {
    backgroundColor: '#00bcd4',
    color: 'white'
  },
  cancelButton: {
    backgroundColor: '#00bcd4',
    color: 'white'
  },
  
  successMessage: {
    color: 'green',
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '14px'
  }
};

export default EditFlashcard
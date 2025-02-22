
import { useState} from 'react';
import { handleAddFlashcard } from '../components/ApiCall.jsx';

function AddFlashcard() {
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', topic_id: 1 });
    const [topicIdInput, setTopicIdInput] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Enter flashcard question"
                value={newFlashcard.question}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
            />
            <input
                type="text"
                placeholder="Enter flashcard answer"
                value={newFlashcard.answer}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
            />
            <input
                type="text"
                placeholder="Enter topic ID"
                value={topicIdInput}
                onChange={(e) => setTopicIdInput(e.target.value)}
            />
            <button
                onClick={async () => {
                    try {
                        await handleAddFlashcard(newFlashcard, topicIdInput, setNewFlashcard);
                    } catch (error) {
                        console.error('Error adding flashcard:', error);
                    }
                }}
            >
                Add Flashcard
            </button>
        </div>
    )
}

export default AddFlashcard

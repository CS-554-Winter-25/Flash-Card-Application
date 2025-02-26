
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAddFlashcard } from '../components/ApiCall.jsx';
import { useAppContext } from "../AppContext"; 

function AddFlashcard() {
    const navigate = useNavigate();
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', topic_id: 1 });
    const [topicName, setTopicName] = useState('');
    const [topicIdInput, setTopicIdInput] = useState('');
    const { topics } = useAppContext(); 

    const handleTopicInput = (e) => {
        try {
            const input = e.target.value;
            setTopicName(input);
            const topic = topics.find(t => t.topic.toLowerCase() === input.toLowerCase());
            if (!topic) {
                throw new Error('Topic not found');
            }
            setTopicIdInput(topic.id);
        } catch (error) {
            console.log(error.message)
        }
    }

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
                placeholder="Enter topic Name"
                value={topicName}
                onChange={handleTopicInput}
            />
            <button
                onClick={async () => {
                    try {
                        await handleAddFlashcard(newFlashcard, topicIdInput, setNewFlashcard);
                        navigate('/');
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

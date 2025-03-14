import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAddFlashcard } from '../components/ApiCall.jsx';
import { useAppContext } from "../AppContext";

function AddFlashcard() {
    const navigate = useNavigate();
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', topic_id: '' });
    const [topicName, setTopicName] = useState('');
    const [topicIdInput, setTopicIdInput] = useState('');
    const { topics } = useAppContext(); 

    const handleTopicChange = (e) => {
        setTopicName(e.target.value);
        const selectedTopic = topics.find(topic => topic.topic === e.target.value);
        if (selectedTopic) {
            setTopicIdInput(selectedTopic.id);
        }
      };

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
            <select value={topicName} onChange={handleTopicChange} className="input">
                <option value="" disabled>Select topic</option>
                {topics.map((topic) => (
                    <option key={topic.id} value={topic.topic}>
                    {topic.topic}
                    </option>
                ))}
            </select>

            <button
                onClick={async () => {
                    try {
                        await handleAddFlashcard(newFlashcard, topicIdInput, setNewFlashcard);
                        navigate('/'); // redirect to stuyd/:topic?
                    } catch (error) {
                        console.error('Error adding flashcard:', error);
                    }
                }}
            >
                Add Flashcard
            </button>
        </div>
    );
}

export default AddFlashcard;
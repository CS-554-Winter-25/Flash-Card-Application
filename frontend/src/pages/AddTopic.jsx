import { useState } from 'react'
import { handleAddTopic } from '../components/ApiCall.jsx';

function AddTopic() {
    const [newTopicName, setNewTopicName] = useState('');
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', topic_id: 1 });

    return (
        <div>
            <input
                type="text"
                placeholder="Enter new topic name"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
            />
            <button
                onClick={async () => {
                    try {
                        await handleAddTopic(newTopicName, setNewTopicName, setNewFlashcard);  
                    } catch (error) {
                        console.error('Error adding topic:', error);
                    }
                }}
            >
                Add Topic
            </button>
        </div>
    )
}

export default AddTopic
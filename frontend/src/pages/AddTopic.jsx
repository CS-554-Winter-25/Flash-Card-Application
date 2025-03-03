import { useState } from 'react'
import { useAppContext } from '../AppContext';
import { handleAddTopic } from '../components/ApiCall.jsx';

function AddTopic() {
    const { topics, setTopics } = useAppContext(); 
    const [newTopicName, setNewTopicName] = useState('');
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', topic_id: '' });

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
                        const resp = await handleAddTopic(newTopicName, setNewTopicName, setNewFlashcard);  
                        setTopics((prevTopics) => [...prevTopics, { topic: resp.topic, id: resp.id }]);
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
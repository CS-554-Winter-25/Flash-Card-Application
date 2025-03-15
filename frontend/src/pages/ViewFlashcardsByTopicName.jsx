import { useState } from 'react'
import { handleFetchFlashcardsByTopicName } from '../components/ApiCall.jsx';
import FlashcardList from '../components/FlashcardList/FlashcardList.jsx';
import { useAppContext } from "../AppContext";
import './topic.css'

function ViewFlashcardsByTopicName() {
  const [topicNameInput, setTopicNameInput] = useState('');
  const [topicName, setTopicName] = useState('');
  const { topics, setTopics } = useAppContext(); 
  const [topicIdInput, setTopicIdInput] = useState('');
    

  const [topicData, setTopicData] = useState({
    topicId: null,
    topicName: '',
    flashcards: []
  });

  const handleTopicChange = (e) => {
    setTopicName(e.target.value);
    const selectedTopic = topics.find(topic => topic.topic === e.target.value);
    if (selectedTopic) {
      setTopicIdInput(selectedTopic.id);
    }
  };

  return (
    <div>
      <select value={topicName} onChange={handleTopicChange} className="input">
          <option value="" disabled>Select topic</option>
          {topics.map((topic) => (
              <option key={topic.id} value={topic.topic}>
              {topic.topic}
              </option>
          ))}
      </select>
      <button
        className="fetch-button"
        onClick={

          async () => {
            try {
              await handleFetchFlashcardsByTopicName(topicName, setTopicData);
            } catch (error) {
              console.error('Error fetching topic by name:', error);
            }
          }}
      >
        Fetch Flashcards
      </button>

      {topicData.flashcards && topicData.flashcards.length > 0 && (
        <div>
          <h2>Topic: {topicData.topicName}</h2>
          <FlashcardList topic={topicData} />
        </div>
      )}
    </div>

  )
}

export default ViewFlashcardsByTopicName

import { useState } from 'react'
import { handleFetchAllFlashcardsByTopic } from '../components/ApiCall';

function ViewAllTopics() {

  const [topicData, setTopicData] = useState({
    topicId: null,
    topicName: '',
    flashcards: []
  });

  return (
    <div>
      <button
        className="fetch-button"
        onClick={async () => {
          try {
            await handleFetchAllFlashcardsByTopic(setTopicData);
          } catch (error) {
            console.error('Error fetching all topics:', error);
          }
        }}
      >
        Fetch Topics
      </button>
      <div className="topics-container">
        {topicData.length > 0 ? (
          topicData.map((topic) => (
            <div key={topic.id} className="topic-box">
              <p>{topic.topic}</p>
            </div>
          ))
        ) : (
          <p>Click Fetch Topics to load data.</p>
        )}
      </div>
    </div>
  )
}

export default ViewAllTopics

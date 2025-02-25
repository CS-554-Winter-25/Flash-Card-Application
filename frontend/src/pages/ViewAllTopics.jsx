import { useState, useEffect } from 'react';
import { handleFetchAllFlashcardsByTopic } from '../components/ApiCall';

function ViewAllTopics() {
  const [topicData, setTopicData] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        await handleFetchAllFlashcardsByTopic(setTopicData);
      } catch (error) {
        console.error('Error fetching all topics:', error);
      }
    };

    fetchTopics();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1 className="all-topics-title">All Availible Topics</h1>
      <div className="topics-container">
        {topicData.length > 0 ? (
          topicData.map((topic) => (
            <div key={topic.id} className="topic-box">
              <p>{topic.topic}</p>
            </div>
          ))
        ) : (
          <p>Loading topics...</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllTopics;

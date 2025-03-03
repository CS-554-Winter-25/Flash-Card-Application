import { useState, useEffect } from 'react';
import { Edit, Trash } from 'lucide-react';
import { fetchAllTopics } from '../components/ApiCall';

function ViewAllTopics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetchAllTopics();
        setTopics(response)
      } catch (error) {
        console.error('Error fetching all topics:', error);
      }
    };

    fetchTopics();
  }, []); 

  return (
    <div>
      <h1 className="all-topics-title">All Available Topics</h1>
      <div className="topics-container">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div key={topic.id} className="topic-box">
              <p>{topic.topic}</p>
              <a href={`/study/${topic.topic}`} className="study-link">Study</a>
              <div className="topic-actions">
                <button className="edit-icon">
                  <Edit size={24} /> 
                </button> 
                <button className="delete-icon">
                  <Trash size={24} /> 
                </button> 
              </div>
            </div>
          ))
        ) : (
          <p>No topics to display</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllTopics;

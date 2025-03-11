import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Edit, Trash } from 'lucide-react';
import { fetchAllTopics } from '../components/ApiCall';

function ViewAllTopics() {
  const [darkMode, setDarkMode] = useState(false);
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

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div>
      <h1 className="all-topics-title">All Available Topics</h1>
      <div className="topics-container">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div key={topic.id} className="topic-box">
              <Link to={`/study/${topic.topic}`} className="topic-box-link">{topic.topic}</Link>
              <div className="topic-actions">
                <button className="edit-icon">
                  <Edit size={20} /> 
                </button> 
                <button className="delete-icon">
                  <Trash size={20} /> 
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
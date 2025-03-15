import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Edit, Trash } from 'lucide-react';
import { fetchAllTopics } from '../components/ApiCall';
import './topic.css'
import EditTopic from './EditTopic'

function ViewAllTopics() {
  const [topics, setTopics] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [topic, setTopic] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const handleEdit = (id) => {
    console.log('Editing topic with ID:', id);
    setSelectedTopicId(id)
    setIsEditing(true);
  };



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
              <Link to={`/study/${topic.topic}`} className="topic-box-link">{topic.topic}</Link>
              <div className="topic-actions">
                <button className="edit-icon" onClick={() =>handleEdit(topic.id)}>
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
{isEditing && (
  <EditTopic
    topic={selectedTopicId}
    onCancel={() => {
      console.log('Canceled edit');
      setIsEditing(false);
    }}
  />
)}
    </div>
  );
}

export default ViewAllTopics;
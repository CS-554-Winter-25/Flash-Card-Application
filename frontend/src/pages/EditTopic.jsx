import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleEditTopic } from '../components/ApiCall.jsx'; // Add handle delete here later
import { useAppContext } from "../AppContext";
import './EditTopic.css'; // Importing the CSS file

function EditTopic({ topic, onCancel }) {
  const navigate = useNavigate();
  const { topics } = useAppContext();
  const [updatedTopic, setUpdatedTopic] = useState({ name: topic.name });

  const handleSave = async () => {
    try {
      await handleEditTopic(topic, updatedTopic.name);
      console.log('Topic updated successfully');
      navigate('/ViewAllTopics');
    } catch (error) {
      console.error('Error updating topic:', error);
    }
    window.location.reload()
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="header">Edit Topic</h2>
        <input
          type="text"
          placeholder="Enter topic name"
          value={updatedTopic.name}
          onChange={(e) => setUpdatedTopic({ ...updatedTopic, name: e.target.value })}
          className="input"
        />
        <button onClick={handleSave} className="button save-button">
          Save Changes
        </button>
        <button onClick={onCancel} className="button cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditTopic;
``
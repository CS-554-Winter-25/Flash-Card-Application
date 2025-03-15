import axios from '../utils/axiosClient.js';

// Takes flashcard id as input and will produce the matching flashcard
export const handleViewFlashcard = async (flashcardId, setFlashcardData) => {
  console.log(flashcardId)
  if (!flashcardId) {
    throw new Error('Flashcard ID is required.');
  }
  try {
    const response = await axios.get(`/flashcard/?id=${flashcardId}`);
    setFlashcardData(response.data); 
    console.log(response.data)
    return response.data; 
    
  } catch (error) {
    console.error('Error fetching flashcard:', error);
    throw error;
  }
};


// Adds a new flashcard
// ***There must be an existing topic before it will add a new flashcard**
  export const handleAddFlashcard = async (newFlashcard, topicIdInput, setNewFlashcard) => {
    if (!topicIdInput || !newFlashcard.question || !newFlashcard.answer) {
      throw new Error('All fields are required.');
    }
    try {
      const response = await axios.post('/flashcard/', {
        ...newFlashcard,
        topic_id: topicIdInput 
      });

      alert('Flashcard added successfully!');
      setNewFlashcard({ question: '', answer: '', topic_id: topicIdInput }); // Reset the form
      return response.data; 

    } catch (error) {
      console.error('Error adding flashcard:', error);
      throw error;
    }
  };

  // Creates a new Topic
  export const handleAddTopic = async (newTopicName, setNewTopicName, setNewFlashcard) => {
      if (!newTopicName) {
        throw new Error('Topic name is required.');
      }
      try {
        const response = await axios.post(`/topic/?topic=${encodeURIComponent(newTopicName)}`);
        if (response.status === 200) {
          const newTopicId = response.data.id;
          console.log('Topic added successfully with ID:', newTopicId);
          alert('Topic added successfully');
          setNewTopicName('');
          setNewFlashcard({ question: '', answer: '', topic_id: '' });
          return response.data;
        }
      } catch (error) {
        console.error('Error creating topic:', error.response?.data || error);
        alert('Error creating topic. Check console for details.');
        throw error;
      }
    };


// Delete a flashcard
export const handleDeleteFlashcard = async (flashcardId, setFlashcards, setNewFlashcard, topicIdInput) => {
  if (!flashcardId) {
    throw new Error('Flashcard ID is required.');
  }

  try {
    await axios.delete(`/flashcard/?id=${flashcardId}`);

    setFlashcards((prevFlashcards) => prevFlashcards.filter(flashcard => flashcard.id !== flashcardId));
    
    alert('Flashcard deleted successfully!');
    setNewFlashcard({ question: '', answer: '', topic_id: topicIdInput });

  } catch (error) {
    console.error('Error deleting flashcard:', error);
    throw error;
  }
};


// Takes an input name and creates a new topic, which generates a unique topic id
export const handleFetchFlashcardsByTopicID = async (topicIdInput, setTopicData) => {
  if (!topicIdInput) {
    throw new Error('Topic ID is required.'); 
  }

  try {
    const response = await axios.get(`/topic/?topic_id=${topicIdInput}`);
    setTopicData({
      topicId: response.data.id,
      topicName: response.data.topic,
      flashcards: response.data.flashcards,
    });
  } catch (error) {
    console.error('Error fetching topic data:', error);
    throw error;
  }
};

export const fetchAllTopics = async () => {
  try {
    const response = await axios.get(`/topics`);
    return response.data; // Returns array of topic objects (or empty array if none found)
  } catch (error) {
    console.error('Error fetching topic data:', error);
    throw error;
  }
};

export const fetchFlashcardsByTopic = async (topic) => {
  try {
    const response = await axios.get(`/topic/by-name?topic=${topic}`);
    return response.data.flashcards; // Returns array of flashcard objects (or empty array if none found)
  } catch (error) {
    console.error("Error fetching flashcard data:", error);
    throw error;
  }
};


// Takes topic name as input and returns all flashcards under that topic name (different than topic id)
export const handleFetchFlashcardsByTopicName = async (topicNameInput, setTopicData) => {
  if (!topicNameInput) {
    alert("Please enter a topic name.");
    return;
  }

  try {
    const response = await axios.get(`/topic/by-name?topic=${topicNameInput}`);
    const data = await response.data;
    setTopicData({
      id: data.id,
      topicName: data.topic,
      flashcards: data.flashcards || [],
    });
  } catch (error) {
    console.error("Error fetching topic data:", error);
    alert("Could not fetch topic data. Please try again.");
  }
};


// Updates an existing flashcard with new data
export const handleUpdateFlashcard = async (flashcardId, updatedFlashcard, setTopicData, topicData, editingIndex, setEditingIndex) => {
  if (!flashcardId || !updatedFlashcard.question || !updatedFlashcard.answer) {
    throw new Error('All fields are required.');
  }

  try {
    await axios.put(`/flashcard/?id=${flashcardId}`, updatedFlashcard);

    const updatedFlashcards = [...topicData.flashcards];
    updatedFlashcards[editingIndex] = {
      ...updatedFlashcards[editingIndex],
      ...updatedFlashcard,
    };

    setTopicData({ ...topicData, flashcards: updatedFlashcards });

    setEditingIndex(null);
    console.log('Flashcard updated successfully');
    alert('Flashcard updated successfully!');
  } catch (error) {
    console.error('Error updating flashcard:', error);
    throw error;
  }
};

export const getTopics = async () => {
  try {
    const response = await axios.get(`/topics/`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error; 
  }
};

export const getFlashcards = async () => {
  try {
    const response = await axios.get(`/flashcards/`);
    console.log("getFlashcards: ", response.data)
    return response.data; 
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error; 
  }
};

// Edit a Topic
export const handleEditTopic = async (topicId, updatedTopicName) => {
  if (!topicId) {
    throw new Error('Topic ID is required')
  }
  if (!updatedTopicName) {
    throw new Error('Updated topic name is required.');
  }
  try {
    console.log("Updated topic name:", updatedTopicName);
    const response = await axios.put(`/topic/?topic=${topicId}`,
    { topic: updatedTopicName, topic_id: topicId });
    if (response.status === 200) {
      console.log('Topic updated successfully:', response.data);
      alert('Topic updated successfully!');
      return response.data;
    }
  } catch (error) {
    console.error('Error updating topic:', error.response?.data || error);
    alert('Error updating topic. Check console for details.');
    throw error;
  }
};

// Delete a Topic
export const handleDeleteTopic = async (topicId, setTopics) => {
  if (!topicId) {
    throw new Error('Topic ID is required.');
  }

  try {
    await axios.delete(`/topic/?topic_id=${topicId}`);

    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.filter((topic) => topic.id !== topicId);
      return updatedTopics;
    });

    alert('Topic deleted successfully!');
  } catch (error) {
    console.error('API call: error deleting topic:', error);
    throw error;
  }
};
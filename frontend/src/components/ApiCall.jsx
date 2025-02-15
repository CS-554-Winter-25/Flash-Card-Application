import axios from 'axios';


// Takes flashcard id as input and will produce the matching flashcard
export const handleViewFlashcard = async (flashcardId, setFlashcardData) => {
  console.log(flashcardId)
  if (!flashcardId) {
    throw new Error('Flashcard ID is required.');
  }
  try {
    const response = await axios.get(`http://127.0.0.1:5000/flashcard/?id=${flashcardId}`);
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
      const response = await axios.post('http://127.0.0.1:5000/flashcard/', {
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
  export const handleAddTopic = async (newTopicName, setNewTopicName, setNewFlashcard, topicIdInput) => {
  if (!newTopicName) {
    throw new Error('Topic name is required.');
  }

  try {
    const response = await axios.post(`http://127.0.0.1:5000/topic/?topic=${encodeURIComponent(newTopicName)}`);
    
    const newTopicId = response.data.id;
    console.log('Topic added successfully with ID:', newTopicId);
    alert(`Topic added successfully with ID: ${newTopicId}`);

    setNewTopicName('');
    
    setNewFlashcard({ question: '', answer: '', topic_id: newTopicId });

    return response.data;

  } catch (error) {
    console.error('Error creating topic:', error.response?.data || error);
    alert('Error creating topic. Check console for details.');
    throw error;
  }
};


// Delete a flashcard
// Not currently implemented in the UI
export const handleDeleteFlashcard = async (flashcardId, setFlashcards, setNewFlashcard, topicIdInput) => {
  if (!flashcardId) {
    throw new Error('Flashcard ID is required.');
  }

  try {
    await axios.delete(`http://127.0.0.1:5000/flashcard/?id=${flashcardId}`);
    
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
    const response = await axios.get(`http://127.0.0.1:5000/topic/?id=${topicIdInput}`);
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

// Displays all created topics
export const handleFetchAllFlashcardsByTopic = async (setTopicData) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/topic/all`);
    setTopicData(response.data); // Assuming response.data is an array of topics
  } catch (error) {
    console.error('Error fetching topic data:', error);
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
    const response = await fetch(`http://127.0.0.1:5000/topic/by-name?topic=${encodeURIComponent(topicNameInput)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch topic data.");
    }
    const data = await response.json();
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
export const handleUpdateFlashcard = async (flashcardId, updatedFlashcard, setTopicData, topicData, editingIndex, setEditingIndex, setCurrentPage) => {
  if (!flashcardId || !updatedFlashcard.question || !updatedFlashcard.answer) {
    throw new Error('All fields are required.');
  }

  try {
    await axios.put(`http://127.0.0.1:5000/flashcard/?id=${flashcardId}`, updatedFlashcard);

    const updatedFlashcards = [...topicData.flashcards];
    updatedFlashcards[editingIndex] = {
      ...updatedFlashcards[editingIndex],
      ...updatedFlashcard,
    };

    setTopicData({ ...topicData, flashcards: updatedFlashcards });

    setEditingIndex(null);
    setCurrentPage('view-by-topic');

    alert('Flashcard updated successfully!');
  } catch (error) {
    console.error('Error updating flashcard:', error);
    throw error;
  }
};

export const getTopics = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/topics/`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error; 
  }
};

import { useState } from 'react'
import { AppProvider } from '../AppContext.jsx';
import { handleFetchFlashcardsByTopicName } from '../components/ApiCall.jsx';
import FlashcardList from '../components/FlashcardList/FlashcardList.jsx';

function ViewFlashcardsByTopicName() {
  const [topicNameInput, setTopicNameInput] = useState('');

  const [topicData, setTopicData] = useState({
    topicId: null,
    topicName: '',
    flashcards: []
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Enter topic name"
        value={topicNameInput}
        onChange={(e) => setTopicNameInput(e.target.value)}
      />
      <button
        className="fetch-button"
        onClick={

          async () => {
            try {
              await handleFetchFlashcardsByTopicName(topicNameInput, setTopicData);
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
          <AppProvider>
            <FlashcardList topic={topicData} />
          </AppProvider>
        </div>
      )}
    </div>

  )
}

export default ViewFlashcardsByTopicName

import { useState} from 'react';
import { AppProvider } from "./AppContext";
import Navigation from './components/Navigation';
import './App.css';

import { handleViewFlashcard } from './components/ApiCall.jsx';
import { handleAddFlashcard } from './components/ApiCall.jsx';
import { handleAddTopic } from './components/ApiCall.jsx';
import { handleFetchFlashcardsByTopicID } from './components/ApiCall.jsx';
import { handleFetchAllFlashcardsByTopic } from './components/ApiCall.jsx';
import { handleFetchFlashcardsByTopicName } from './components/ApiCall.jsx';
import { handleUpdateFlashcard } from './components/ApiCall.jsx';
import TopicList from './components/TopicList.jsx';


function App() {
  const [flipped, setFlipped] = useState({});
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', topic_id: 1 });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [flashcardData, setFlashcardData] = useState(null); 
  const [flashcardId, setFlashcardId] = useState(''); 
  const [topicIdInput, setTopicIdInput] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [topicNameInput, setTopicNameInput] = useState('');

  const [topicData, setTopicData] = useState({
    topicId: null,
    topicName: '',
    flashcards: []
  });



  const handleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleFetchFlashcard = async () => {
    try {
      if (flashcardId) {
        await handleViewFlashcard(flashcardId, setFlashcardData);
      }
    } catch (error) {
      console.error('Error fetching flashcard:', error);
    }
  };

  return (
    <div>
      {currentPage !== 'landing' && (
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      {/*Main Menu*/}
      {currentPage === 'landing' ? (
        <div>
          <h1>Flashcards Main Menu</h1>
          <AppProvider>
            <TopicList />
          </AppProvider>
          <div className="nav-btn-container">
            <button onClick={() => setCurrentPage('add-flashcard')} className="nav-btn">
              Add Flashcard
            </button>
            <button onClick={() => setCurrentPage('view-flashcard-by-flashcard-id')} className="nav-btn">
              View Flashcards by ID
            </button>
            <button onClick={() => setCurrentPage('add-topic')} className="nav-btn">
              Add Topic
            </button>
            <button onClick={() => setCurrentPage('view-topic-by-topic-name')} className="nav-btn">
              View Flashcards by Topic Name
            </button>
            <button onClick={() => setCurrentPage('view-flashcards-by-topic-id')} className="nav-btn">
              View Flashcards by Topic ID
            </button>
            <button onClick={() => setCurrentPage('view-all-topics')} className="nav-btn">
              View All Topics
            </button>
          </div>
        </div>
      ) : (
        <div>

          {/*View Flashcards by entering in the flashcard ID generated by the backend*/}
          {currentPage === 'view-flashcard-by-flashcard-id' && (
            <div>
              <input
                type="number"
                placeholder="Enter flashcard ID"
                value={flashcardId}
                onChange={(e) => setFlashcardId(e.target.value)}
              />
              <button className="fetch-button" onClick={handleFetchFlashcard}>
                Fetch Flashcards
              </button>

              {flashcardData ? (
                <div className="flashcard-container">
                  <div
                    onClick={() => handleFlip(0)}
                    className={`flashcard ${flipped[0] ? 'flipped' : ''}`}
                  >
                    <div className="flashcard-inner">
                      <div className="flashcard-front">
                        <h3>{flashcardData.question}</h3>
                      </div>
                      <div className="flashcard-back">
                        <p>{flashcardData.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading flashcard...</p>
              )}
            </div>
          )}

          {/*View All Current Topics*/}
          {currentPage === 'view-all-topics' && (
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
          )}

          {/*View Topics by entering in the topic id generated by the backend*/}
          {currentPage === 'view-flashcards-by-topic-id' && (
            <div>
              <input
                type="text"
                placeholder="Enter topic ID"
                value={topicIdInput}
                onChange={(e) => setTopicIdInput(e.target.value)}
              />
              <button
                className="fetch-button"
                onClick={async () => {
                  try {
                    await handleFetchFlashcardsByTopicID(topicIdInput, setTopicData);
                  } catch (error) {
                    console.error('Error fetching flashcards by topic:', error);
                  }
                }}
              >
                Fetch Flashcards
              </button>

              {topicData.flashcards.length > 0 && (
                <div>
                  <h2>Topic: {topicData.topicName}</h2>
                  <div>
                    {topicData.flashcards.map((flashcard, index) => (
                      <div key={flashcard.id} className="flashcard-container">
                        <div
                          className={`flashcard ${flipped[index] ? 'flipped' : ''}`}
                          onClick={() => handleFlip(index)}
                        >
                          <div className="flashcard-inner">
                            <div className="flashcard-front">
                              <h3>{flashcard.question}</h3>
                            </div>
                            <div className="flashcard-back">
                              <p>{flashcard.answer}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          className="edit-button"
                          onClick={() => {
                            setEditingIndex(index);
                            setNewFlashcard({
                              question: flashcard.question,
                              answer: flashcard.answer,
                              topic_id: topicIdInput,
                            });
                            setCurrentPage('edit');
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/*View Topics by entering in topic name*/}
          {currentPage === 'view-topic-by-topic-name' && (
            <div>
              <input
                type="text"
                placeholder="Enter topic name"
                value={topicNameInput}
                onChange={(e) => setTopicNameInput(e.target.value)}
              />
              <button
                className="fetch-button"
                onClick={async () => {
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
                  <div>
                    {topicData.flashcards.map((flashcard, index) => (
                      <div key={flashcard.id} className="flashcard-container">
                        <div
                          className={`flashcard ${flipped[index] ? 'flipped' : ''}`}
                          onClick={() => handleFlip(index)}
                        >
                          <div className="flashcard-inner">
                            <div className="flashcard-front">
                              <h3>{flashcard.question}</h3>
                            </div>
                            <div className="flashcard-back">
                              <p>{flashcard.answer}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          className="edit-button"
                          onClick={() => {           
                            setEditingIndex(index);
                            setNewFlashcard({
                              question: flashcard.question,
                              answer: flashcard.answer,
                              topic_id: topicData.id, // Use the topic's actual ID if needed
                            });
                            setCurrentPage('edit-flashcard');
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/*Edit a current flashcard*/}
          {currentPage === 'edit-flashcard' && editingIndex !== null && (
            <div>
              <h2>Edit Flashcard</h2>
              <input
                type="text"
                placeholder="Enter flashcard question"
                value={newFlashcard.question}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter flashcard answer"
                value={newFlashcard.answer}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
              />
              <button
                onClick={() => {
                  const updatedFlashcard = { ...newFlashcard };
                  const flashcardId = topicData.flashcards[editingIndex].id;

                  handleUpdateFlashcard(
                    flashcardId,
                    updatedFlashcard,
                    setTopicData,
                    topicData,
                    editingIndex,
                    setEditingIndex,
                    setCurrentPage
                  );
                }}
              >
                Save Changes
              </button>
              <button onClick={() => setCurrentPage('view-by-topic')}>Cancel</button>
            </div>
          )}

          {/*Add a new flashcard*/}
          {currentPage === 'add-flashcard' && (
            <div>
              <input
                type="text"
                placeholder="Enter flashcard question"
                value={newFlashcard.question}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter flashcard answer"
                value={newFlashcard.answer}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter topic ID"
                value={topicIdInput}
                onChange={(e) => setTopicIdInput(e.target.value)}
              />
              <button
                onClick={async () => {
                  try {
                    await handleAddFlashcard(newFlashcard, topicIdInput, setNewFlashcard);
                  } catch (error) {
                    console.error('Error adding flashcard:', error);
                  }
                }}
              >
                Add Flashcard
              </button>
            </div>
          )}

          {/*Add a topic*/}
          {currentPage === 'add-topic' && (
            <div>
              <input
                type="text"
                placeholder="Enter new topic name"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
              />
              <button
                onClick={async () => {
                  try {
                    await handleAddTopic(newTopicName, setNewTopicName, setNewFlashcard, topicIdInput);
                    setCurrentPage('landing'); 
                  } catch (error) {
                    console.error('Error adding topic:', error);
                  }
                }}
              >
                Add Topic
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default App;

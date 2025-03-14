import { useState, useEffect } from 'react';
import { handleFetchFlashcardsByTopicName } from '../components/ApiCall.jsx';
import { useAppContext } from '../AppContext.jsx';
import React from "react";
import FlashcardList from '../components/FlashcardList/FlashcardList.jsx';
import './Games.css'

function TimerGame() {
  const [topicName, setTopicName] = useState('');
  const { topics } = useAppContext();
  const [topicData, setTopicData] = useState({
    topicId: null,
    topicName: '',
    flashcards: [],
  });

  // User quiz state
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Track current flashcard

  useEffect(() => {
    if (topicData.flashcards.length > 0) {
      setCurrentIndex(0); // Reset to first flashcard when a new topic is loaded
    }
  }, [topicData]);

  const handleTopicChange = (e) => {
    setTopicName(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (topicData.flashcards.length === 0) return;

    const currentFlashcard = topicData.flashcards[currentIndex];
    if (userInput.trim().toLowerCase() === currentFlashcard.answer.toLowerCase()) {
      setFeedback('✅ Correct!');
      // Move to the next flashcard after a correct answer
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setUserInput(''); // Reset input field
        setFeedback('');
      }, 1000); // Delay before showing the next flashcard
    } else {
      setFeedback('❌ Incorrect, try again.');
    }
  };

  return (
    <div className="games-container">
      <h1 className="main-menu-title">Quiz Mode</h1>
      
      {/* Dropdown Selection */}
      <div className="input-group">
        <select value={topicName} onChange={handleTopicChange} className="input">
          <option value="" disabled>Select topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.topic}>
              {topic.topic}
            </option>
          ))}
        </select>
        <button
          className="fetch-button"
          onClick={async () => {
            try {
              await handleFetchFlashcardsByTopicName(topicName, setTopicData);
            } catch (error) {
              console.error('Error fetching topic by name:', error);
            }
          }}
        >
          Fetch Flashcards
        </button>
      </div>
      {topicData.flashcards.length > 0 && currentIndex < topicData.flashcards.length && (
        <div>
          <h2>Topic: {topicData.topicName}</h2>
          <FlashcardList topic={{ ...topicData, flashcards: [topicData.flashcards[currentIndex]] }} />
          <div className="answer-container">
            <input 
              type="text" 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)} 
              placeholder="Enter your answer..." 
            />
            <button onClick={handleCheckAnswer} className="fetch-button">Submit</button>
            <p>{feedback}</p>
          </div>
        </div>
      )}

      {currentIndex >= topicData.flashcards.length && topicData.flashcards.length > 0 && (
        <div>
          <h2>You've completed the quiz!</h2>
        </div>
      )}
    </div>
  );
}

export default TimerGame;

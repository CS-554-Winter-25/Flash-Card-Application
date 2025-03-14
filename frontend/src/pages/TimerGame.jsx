
import { useState, useEffect } from 'react';
import { handleFetchFlashcardsByTopicName } from '../components/ApiCall.jsx';
import FlashcardList from '../components/FlashcardList/FlashcardList.jsx';
import { useAppContext } from '../AppContext.jsx';
import React from "react";
import './Games.css'



function TimerGame() {
  const [topicNameInput, setTopicNameInput] = useState('');
  const [topicName, setTopicName] = useState('');
  const { topics } = useAppContext();
  const [topicIdInput, setTopicIdInput] = useState('');
  const [topicData, setTopicData] = useState({
    topicId: null,
    topicName: '',
    flashcards: [],
  });

  // Timer states
  const [selectedTime, setSelectedTime] = useState(30);
  const [timer, setTimer] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      window.alert('Time is up!');
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleStartTimer = () => {
    setTimer(selectedTime);
    setIsRunning(true);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimer(selectedTime);
  };

  const handleTopicChange = (e) => {
    setTopicName(e.target.value);
    const selectedTopic = topics.find(topic => topic.topic === e.target.value);
    if (selectedTopic) {
      setTopicIdInput(selectedTopic.id);
    }
  };

  return (
    <div className="games-container">
      <h1 className="main-menu-title">Timed Mode</h1>

<div className="timer-container">
  <div className="timer-buttons">
    <button onClick={handleStartTimer} className="timer-button" disabled={isRunning}>
      Start Timer
    </button>
    <button onClick={handleResetTimer} className="timer-button">
      Reset
    </button>
  </div>
    <select 
    value={selectedTime} 
    onChange={(e) => {
      const newTime = parseInt(e.target.value);
      setSelectedTime(newTime);
      setTimer(newTime);
    }} 
    className="timer-select"
    disabled={isRunning} 
  >
    <option value={30}>30 seconds</option>
    <option value={60}>60 seconds</option>
    <option value={90}>90 seconds</option>
    <option value={120}>120 seconds</option>
  </select>
  <h2>Time remaining {timer} seconds</h2>

</div>



      {/* Dropdown Selection */}
      <div className="input-group">
        <select value={topicName} onChange={handleTopicChange} className="input">
          <option value="" disabled>
            Select topic
          </option>
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

      {/* Display Flashcards */}
      {topicData.flashcards.length > 0 && (
        <div>
          <h2>Topic: {topicData.topicName}</h2>
          <FlashcardList topic={topicData} />
        </div>
      )}
    </div>
  );
}

export default TimerGame;
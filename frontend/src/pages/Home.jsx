import React from "react"
import { useNavigate } from 'react-router-dom';
import { AppProvider } from "../AppContext";
import TopicList from "../components/TopicList";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Flashcards Main Menu</h1>
      <AppProvider>
        <TopicList />
      </AppProvider>
      <div className="nav-btn-container">
        <button onClick={() => navigate('/AddFlashcard')} className="nav-btn">
          Add Flashcard
        </button>
        <button onClick={() => navigate('/ViewFlashcardByFlashcardID')} className="nav-btn">
          View Flashcards by ID
        </button>
        <button onClick={() => navigate('/AddTopic')} className="nav-btn">
          Add Topic
        </button>
        <button onClick={() => navigate('/ViewFlashcardsByTopicName')} className="nav-btn">
          View Flashcards by Topic Name
        </button>
        <button onClick={() => navigate('/ViewFlashcardsByTopicID')} className="nav-btn">
          View Flashcards by Topic ID
        </button>
        <button onClick={() => navigate('/ViewAllTopics')} className="nav-btn">
          View All Topics
        </button>
      </div>
    </div>
  )
}

export default Home
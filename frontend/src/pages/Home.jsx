import React from "react";
import { useNavigate } from 'react-router-dom';
import { AppProvider } from "../AppContext";
import TopicList from "../components/TopicList/TopicList";
import 'font-awesome/css/font-awesome.min.css'; // Import FontAwesome

import {useIsAuthenticated} from "../hooks/isAuthenitcated.jsx";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <h1 className="main-menu-title">Bridge City Flashcards</h1>
      <AppProvider>
        {/* <TopicList /> */}
      </AppProvider>
      {isAuthenticated && (
        <div className="nav-btn-container">

          <button onClick={() => navigate('/AddFlashcard')} className="nav-btn">
            <i className="fa fa-plus"></i> Add Flashcard
          </button>
          <button onClick={() => navigate('/AddTopic')} className="nav-btn">
            <i className="fa fa-plus"></i> Add Topic
          </button>
          <button onClick={() => navigate('/ViewFlashcardsByTopicName')} className="nav-btn">
            <i className="fa fa-book"></i> View Flashcards by Topic Name
          </button>
          <button onClick={() => navigate('/ViewAllTopics')} className="nav-btn">
            <i className="fa fa-th-list"></i> View All Topics
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;

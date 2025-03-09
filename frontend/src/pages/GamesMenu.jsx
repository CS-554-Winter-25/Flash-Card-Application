import React from "react";
import { useNavigate } from "react-router-dom";

function GamesMenu() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="main-menu-title">Select a Game</h1>
      <div className="nav-btn-container">
        <button onClick={() => navigate('/Games/TimerGame')} className="nav-btn">
          <i className="fa fa-clock-o"></i> Timer Game
        </button>
        <button onClick={() => navigate('/Games/QuizGame')} className="nav-btn">
          <i className="fa fa-question-circle"></i> Quiz Game
        </button>
      </div>
    </div>
  );
}

export default GamesMenu;
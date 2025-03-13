import { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import { handleDeleteFlashcard, handleViewFlashcard } from './components/ApiCall.jsx';

/* Components */
import Navbar from './components/Navbar.jsx';

/* Pages */
import Home from './pages/Home'
import AddFlashcard from './pages/AddFlashcard';
import AddTopic from './pages/AddTopic';
import EditFlashcard from './pages/EditFlashcard';
import ViewAllTopics from './pages/ViewAllTopics';
import ViewFlashcardByFlashcardID from './pages/ViewFlashcardByFlashcardID';
import ViewFlashcardsByTopicID from './pages/ViewFlashcardsByTopicID';
import ViewFlashcardsByTopicName from './pages/ViewFlashcardsByTopicName';
import Study from './pages/Study/Study'
import GamesMenu from './pages/GamesMenu'; 
import TimerGame from './pages/TimerGame'; 
import QuizGame from './pages/QuizGame';


function App() {
  const [editingIndex, setEditingIndex] = useState(null);
  const [flashcardData, setFlashcardData] = useState(null); 
  const [flashcardId, setFlashcardId] = useState(''); 

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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddFlashcard" element={<AddFlashcard />} /> 
        <Route path='/ViewFlashcardByFlashcardID' element={<ViewFlashcardByFlashcardID />} /> 
        <Route path="/AddTopic" element={<AddTopic />} /> 
        <Route path="/ViewFlashcardsByTopicName" element={<ViewFlashcardsByTopicName />} />
        <Route path="/ViewFlashcardsByTopicID" element={<ViewFlashcardsByTopicID />} />
        <Route path="/ViewAllTopics" element={<ViewAllTopics />} />
        <Route path="/EditFlashcard" element={<EditFlashcard />} />
        <Route path='/study/:topic' element={<Study />} />
        <Route path="/Games" element={<GamesMenu />} /> 
        <Route path="/Games/TimerGame" element={<TimerGame />} />
        <Route path="/Games/QuizGame" element={<QuizGame />} />
      </Routes>
    </Router>
  )
}

export default App;

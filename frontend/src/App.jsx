import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

/* Components */
import Navbar from './components/Navbar.jsx';

/* Pages */
import Home from './pages/Home'
import AddFlashcard from './pages/AddFlashcard';
import AddTopic from './pages/AddTopic';
import EditFlashcard from './pages/EditFlashcard';
import ViewAllTopics from './pages/ViewAllTopics';
import ViewFlashcardsByTopicName from './pages/ViewFlashcardsByTopicName';
import Study from './pages/Study/Study'
import GamesMenu from './pages/GamesMenu'; 
import TimerGame from './pages/TimerGame'; 
import QuizGame from './pages/QuizGame';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddFlashcard" element={<AddFlashcard />} /> 
        <Route path="/AddTopic" element={<AddTopic />} /> 
        <Route path="/ViewFlashcardsByTopicName" element={<ViewFlashcardsByTopicName />} />
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

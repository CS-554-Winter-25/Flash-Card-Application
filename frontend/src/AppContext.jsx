import { createContext, useContext, useState, useEffect } from 'react';
import { getTopics, getFlashcards } from './components/ApiCall'

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [topics, setTopics] = useState([]);
    const [flashcards, setFlashcards] = useState([]);

    const toggleDarkMode = () => {
      console.log('inside toggleDarkMode')
      console.log(darkMode)
      setDarkMode(!darkMode)
    };

      useEffect(() => {
        console.log("Dark mode state:", darkMode);
        if (darkMode) {
          document.body.classList.add("dark-mode");
        } else {
          console.log("Removed dark mode")
          document.body.classList.remove("dark-mode");
        }
      }, [darkMode]);

    useEffect(() => {
      const fetchTopics = async () => {
        try {
          const topics = await getTopics();
          setTopics(topics);
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
      };
  
      fetchTopics();
    }, []);

    useEffect(() => {
      const fetchFlashcards = async () => {
        try {
          const topicCards = await getFlashcards();
          setFlashcards(topicCards.flashcards);
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
      };

      fetchFlashcards();
    }, []);
  
    const value = {
      topics,
      setTopics,
      flashcards,
      setFlashcards,
      darkMode,
      setDarkMode,
      toggleDarkMode
    };
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  }
  
  export function useAppContext() {
    return useContext(AppContext);
  }
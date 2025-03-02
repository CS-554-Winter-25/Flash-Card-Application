import { createContext, useContext, useState, useEffect } from 'react';
import { getTopics, getFlashcards } from './components/ApiCall'

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [topics, setTopics] = useState([]);
    const [flashcards, setFlashcards] = useState([]);

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
      setFlashcards
    };
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  }
  
  export function useAppContext() {
    return useContext(AppContext);
  }
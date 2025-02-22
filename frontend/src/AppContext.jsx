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
          console.log("app context topics: ", topics[0])
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
          console.log("returned flashcards: ", topicCards)
          setFlashcards(topicCards.flashcards);
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
      };

      fetchFlashcards();
    }, []);
  
    // Value to be provided to consumers
    const value = {
      topics,
      flashcards
    };
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  }
  
  // Custom hook to use the context
  export function useAppContext() {
    return useContext(AppContext);
  }
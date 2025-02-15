import { createContext, useContext, useState, useEffect } from 'react';
import { getTopics } from './components/ApiCall'

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
      const fetchTopics = async () => {
        try {
          const topics = await getTopics();
          setTopics(topics);
          console.log("app context: ", topics[0])
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
      };
  
      fetchTopics();
    }, []);
  
    // Value to be provided to consumers
    const value = {
      topics,
    };
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  }
  
  // Custom hook to use the context
  export function useAppContext() {
    return useContext(AppContext);
  }
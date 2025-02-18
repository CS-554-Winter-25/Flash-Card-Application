import React from "react"
import { useAppContext } from "../AppContext"
import Flashcard from './Flashcard';

function FlashcardList( { topic = undefined }) { 
  const { flashcards, topics } = useAppContext()
  
  // If topic is passed as prop, filter flashcards shown by that topic id
  const topic_id = topic ? (topics.find(obj => obj.topic === topic))?.id : null;
  const data = topic_id ? flashcards.filter((card) => card.topic_id === topic_id) : flashcards;

  return (
    <div className="flashcard-container">
      {data.map((card) =>  (
        // key here is for React's interal use, do not it listed as prop in Flashcard component
        <Flashcard card={card} key={card.id} />
      ))}
    </div>
  )
}

export default FlashcardList;
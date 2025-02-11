import Flashcard from './Flashcard';


// FlashcardList renders a list of flashcards.
function FlashcardList({ flashcards, flipped, handleFlip, currentPage, handleEdit, handleDelete }) {
  return (
    <div className="flashcard-container">
      {flashcards.map((card, index) => (
        <Flashcard
          key={index}
          card={card}
          index={index}
          flipped={flipped}
          handleFlip={handleFlip}
          currentPage={currentPage}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default FlashcardList;


function EditFlashcard() {
    return (
        <div>
            <h2>Edit Flashcard</h2>
                <input
            type="text"
            placeholder="Enter flashcard question"
            value={newFlashcard.question}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter flashcard answer"
            value={newFlashcard.answer}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
          />
          <button
            onClick={() => {
              const updatedFlashcard = { ...newFlashcard };
              const flashcardId = topicData.flashcards[editingIndex].id;

              handleUpdateFlashcard(
                flashcardId,
                updatedFlashcard,
                setTopicData,
                topicData,
                editingIndex,
                setEditingIndex,
                setCurrentPage
              );
            }}
          >
            Save Changes
          </button>
          <button onClick={() => setCurrentPage('view-by-topic')}>Cancel</button>
          <button onClick={() => {
            const flashcardId = topicData.flashcards[editingIndex].id;
            handleDeleteFlashcard(flashcardId, setTopicData);
            setCurrentPage('view-by-topic')
          }}>Delete</button>
        </div>
      )}

export default EditFlashcard
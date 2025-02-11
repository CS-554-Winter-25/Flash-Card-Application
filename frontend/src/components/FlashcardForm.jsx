
// FlashcardForm provides a form for adding or editing a flashcard
// The form consists of inputs for the question and answer, and a submit button to either add or update the flashcard.
function FlashcardForm({ newFlashcard, setNewFlashcard, handleSubmit, editingIndex }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFlashcard(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>{editingIndex !== null ? 'Edit Flashcard' : 'Add a New Flashcard'}</h2>
      <form onSubmit={handleSubmit} className="flashcard-form">
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default FlashcardForm;

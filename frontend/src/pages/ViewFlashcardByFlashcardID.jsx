
function ViewFlashcardByFlashcardID() {
    return (
        <div>
        <p> In progress... </p>
        {/* <div>
            <input
                type="number"
                placeholder="Enter flashcard ID"
                value={flashcardId}
                onChange={(e) => setFlashcardId(e.target.value)}
            />
            <button className="fetch-button" onClick={handleFetchFlashcard}>
                Fetch Flashcards
            </button>

            {flashcardData ? (
                <div className="flashcard-container">
                    <div
                        onClick={() => handleFlip(0)}
                        className={`flashcard ${flipped[0] ? 'flipped' : ''}`}
                    >
                        <div className="flashcard-inner">
                            <div className="flashcard-front">
                                <h3>{flashcardData.question}</h3>
                            </div>
                            <div className="flashcard-back">
                                <p>{flashcardData.answer}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading flashcard...</p>
            )} */}
        </div>
    )
}

export default ViewFlashcardByFlashcardID
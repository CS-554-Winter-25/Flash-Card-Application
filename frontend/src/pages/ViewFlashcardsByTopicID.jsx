
function ViewFlashcardsByTopicID () {
    return (
        <div>
            <p> In progress... </p>
       
        {/* </div>
        <div>
               <input
                type="text"
                placeholder="Enter topic ID"
                value={topicIdInput}
                onChange={(e) => setTopicIdInput(e.target.value)}
              />
              <button
                className="fetch-button"
                onClick={async () => {
                  try {
                    await handleFetchFlashcardsByTopicID(topicIdInput, setTopicData);
                  } catch (error) {
                    console.error('Error fetching flashcards by topic:', error);
                  }
                }}
              >
                Fetch Flashcards
              </button>

              {topicData.flashcards.length > 0 && (
                <div>
                  <h2>Topic: {topicData.topicName}</h2>
                  <div>
                    {topicData.flashcards.map((flashcard, index) => (
                      <div key={flashcard.id} className="flashcard-container">
                        <div
                          className={`flashcard ${flipped[index] ? 'flipped' : ''}`}
                          onClick={() => handleFlip(index)}
                        >
                          <div className="flashcard-inner">
                            <div className="flashcard-front">
                              <h3>{flashcard.question}</h3>
                            </div>
                            <div className="flashcard-back">
                              <p>{flashcard.answer}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          className="edit-button"
                          onClick={() => {
                            setEditingIndex(index);
                            setNewFlashcard({
                              question: flashcard.question,
                              answer: flashcard.answer,
                              topic_id: topicIdInput,
                            });
                            setCurrentPage('edit');
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                </div> */}
                 </div>
    )
}

export default ViewFlashcardsByTopicID

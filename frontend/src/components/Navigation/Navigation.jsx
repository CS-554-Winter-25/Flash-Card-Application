function Navigation({ currentPage, setCurrentPage }) {
  return (
    <div className="nav-btn-container">
      {/* Main Menu button visible on View and Edit pages */}
      {currentPage !== 'landing' && (
        <button onClick={() => setCurrentPage('landing')} className="nav-btn">Main Menu</button>
      )}

      {/* View and Edit buttons visible only on Landing page */}
      {currentPage === 'landing' && (
        <>
          <button onClick={() => setCurrentPage('add-flashcard')} className="nav-btn">Add Flashcard</button>
          <button onClick={() => setCurrentPage('view-flashcard-by-flashcard-id')} className="nav-btn">View Flashcards by ID</button>
          <button onClick={() => setCurrentPage('add-topic')} className="nav-btn">Add Topic</button>
          <button onClick={() => setCurrentPage('view-topic-by-topic-name')} className="nav-btn">View Flashcards by Topic Name</button>
          <button onClick={() => setCurrentPage('view-flashcards-by-topic-id')} className="nav-btn">View Flashcards by Topic ID</button>
          <button onClick={() => setCurrentPage('view-all-topics')} className="nav-btn">View All Topics</button>
        </>
      )}
    </div>
  );
}

export default Navigation;

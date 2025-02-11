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
          <button onClick={() => setCurrentPage('view')} className="nav-btn">View Flashcards</button>
          <button onClick={() => setCurrentPage('edit')} className="nav-btn">Edit Flashcards</button>
        </>
      )}
    </div>
  );
}

export default Navigation;

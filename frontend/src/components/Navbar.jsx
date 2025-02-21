import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import "./navbar.css"; // Import custom CSS
import logo from "./logo.jpg";
import { getAdapter } from "axios";

export default function FloatingNavbar({setCurrentPage}) {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleLogin = () => setUser({ name: "Luiz Silva" });
  const handleLogout = () => setUser(null);


  return (
    <nav className="navbar">

      <div className="navbar-logo">
      <img src={logo} alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-left">
        {user && (
          <>
          <div className="navbar-logged-buttons">
            <button onClick={() => setCurrentPage('landing')} className="navbar-button">Main Menu</button>
            <button onClick={() => setCurrentPage('view-all-topics')} className="navbar-button">My Topics</button>
            <button onClick={() => setCurrentPage('add-topic')} className="navbar-button">New Topic</button>
          </div>
          </>
        )}
      </div>
      
      <div className="navbar-right">
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>
      
      <div className="navbar-login">
        {user ? (
            <button className="login-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-button" onClick={handleLogin}>
              Login with Google
            </button>
        )}
      </div>


      
    </nav>
  );
}

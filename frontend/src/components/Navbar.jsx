import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import "./navbar.css"; // Import custom CSS
import logo from "./logo.jpg";
import { getAdapter } from "axios";

export default function FloatingNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleLogin = () => setUser({ name: "John Doe" });
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
            <button className="navbar-button">Main Menu</button>
            <button className="navbar-button">My Topics</button>
            <button className="navbar-button">New Topic</button>
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

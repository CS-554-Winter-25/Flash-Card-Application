import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import "./navbar.css";
import logo from "./logo.jpg";
import {Login} from "./Navigation/Login.jsx";
import {useIsAuthenticated} from "../hooks/isAuthenitcated.jsx";

export default function FloatingNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);


    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <img src={logo} alt="Logo" className="navbar-logo" />
            </div>

            <div className="navbar-left">
                {isAuthenticated && (
                    <div className="navbar-logged-buttons">
                        <button onClick={() => navigate("/")} className="navbar-button">Main Menu</button>
                        <button onClick={() => navigate("/ViewAllTopics")} className="navbar-button">My Topics</button>
                        <button onClick={() => navigate("/AddTopic")} className="navbar-button">New Topic</button>
                    </div>
                )}
            </div>
        <div className="navbar-right">
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun /> : <Moon />}
            </button>
        </div>
        <Login />

    </nav>
  );
}

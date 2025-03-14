import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import "./navbar.css";
import logo from "./logo.jpg";
import {Login} from "./Navigation/Login.jsx";
import {useIsAuthenticated} from "../hooks/isAuthenitcated.jsx";
import { useAppContext } from '../AppContext'

export default function FloatingNavbar() {
  const { darkMode, toggleDarkMode } = useAppContext();
  const isAuthenticated = useIsAuthenticated();

  const handleClick = () => {
    toggleDarkMode();
  }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" className="navbar-logo" />
            </div>
            <div className="navbar-left">
                {isAuthenticated && (
                    <div className="navbar-links">
                        <Link to="/" className="navbar-link">Main Menu</Link>
                        <Link to="/ViewAllTopics" className="navbar-link">My Topics</Link>
                        <Link to="/AddTopic" className="navbar-link">New Topic</Link>
                    </div>
                )}
            </div>
        <div className="navbar-right">
            <button className="theme-toggle" onClick={handleClick}>
                {darkMode ? <Moon /> : <Sun />}
            </button>
        </div>
        <Login className="navbar-login" />
    </nav>
  );
}
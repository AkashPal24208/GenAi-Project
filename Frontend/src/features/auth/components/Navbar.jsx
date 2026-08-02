import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, handleLogout } = useAuth();    
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="header">
        <div className="logo">LOGO</div>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          <ul onClick={() => setMenuOpen(false)}>
            <li><NavLink to="/">Home</NavLink></li>

            {!user ? (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/gen-report">Generate Reports</NavLink></li>
                <li><NavLink to="/past-report">Past Reports</NavLink></li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
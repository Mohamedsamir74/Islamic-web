import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/islamic.png";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        {/* Menu toggle button */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Website logo */}
        <img src={logo} alt="Website Logo" className="navbar-logo" />
      </div>

      {/* Navigation links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          الرئيسية
        </Link>
        <Link to="/quran" onClick={() => setMenuOpen(false)}>
          الـقرآن
        </Link>
        <Link to="/azkar" onClick={() => setMenuOpen(false)}>
          الأذكار
        </Link>
        <Link to="/scholar" onClick={() => setMenuOpen(false)}>
          ركن الداعية
        </Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          تواصل معنا
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

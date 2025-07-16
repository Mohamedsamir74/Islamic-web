import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/islamic.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">الرئيسية</Link>
        <Link to="/quran">الـقرآن</Link>
        <Link to="/hadith">الأحاديث</Link>
        <Link to="/azkar">الأذكار</Link>
        <Link to="/contact">تواصل معنا</Link>
      </div>
      <img src={logo} alt="لوجو الموقع" className="navbar-logo" />
    </nav>
  );
}

export default Navbar;

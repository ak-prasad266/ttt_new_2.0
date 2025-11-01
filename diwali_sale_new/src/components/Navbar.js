// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Home should reload and open starting page
  const goHomeAndReload = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <a href="/" onClick={goHomeAndReload} className="brand-link">
          <span className="flash">TTT's Diwali Sale 🪔</span>
        </a>
      </div>

      <ul>
        <li><Link to="/mobiles">Mobiles</Link></li>
        <li><Link to="/earbuds">Earbuds</Link></li>
        <li><Link to="/watches">Watches</Link></li>
        <li><Link to="/cart">Cart 🛒</Link></li>
        <li><Link to="/login">Signin</Link></li>
      </ul>
    </header>
  );
};

export default Navbar;

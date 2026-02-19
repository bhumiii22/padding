import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">PADDLE BALL</div>

      {/* Hamburger */}
      <div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/gallery"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Gallery
        </NavLink>

        <NavLink
          to="/tournaments"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Tournaments
        </NavLink>

        <NavLink
          to="/contact"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </NavLink>

        <a
          href=" https://forms.gle/AzRuoXNA6ZBvFcss5"
          
          className="register-btn"
          onClick={() => setMenuOpen(false)}
        >
          Register Now
        </a>

      </div>
    </nav>
  );
};

export default Navbar;

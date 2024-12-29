// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/cv" className="nav-link">
              CV
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              GitHub
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

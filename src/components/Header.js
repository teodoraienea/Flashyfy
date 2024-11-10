import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 


const Header = ({ userName }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-name">Flashify</h1>
      </div>
      <div className="header-right">
        <nav className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cards">Cards</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

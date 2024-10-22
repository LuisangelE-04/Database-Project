import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <div>
          <li><Link to="/">Home</Link></li>
        </div>
        <div>
          <li><Link to="/">Tracking</Link></li>
          <li><Link to="/">Services</Link></li>
          <li><Link to="/">About</Link></li>
          <li><Link to="/">Contact</Link></li>
        </div>
        <div>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
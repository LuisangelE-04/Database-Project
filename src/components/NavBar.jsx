import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <div>
          <li>Home</li>
        </div>
        <div>
          <li>Tracking</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </div>
        <div>
          <li>Login</li>
          <li>Register</li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
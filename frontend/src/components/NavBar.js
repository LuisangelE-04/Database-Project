import React from 'react';
import '../css/NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <div>
          <li><a href="/">Home</a></li>
        </div>
        <div>
          <li><a href="/">About</a></li>
          <li><a href="/">Contact</a></li>
        </div>
        <div>
          <li><a href="/">Login</a></li>
          <li><a href="/">Register</a></li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
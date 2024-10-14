import React from 'react';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <div>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </div>
        <div>
          <li><a href="/register">Register</a></li>
          <li><a href="/login">Login</a></li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
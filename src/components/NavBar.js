import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <div>
          <li><Link to="/" className='nav-link'>Home</Link></li>
        </div>
        <div>
          <li><Link to="/tracking" className='nav-link'>Tracking</Link></li>
          <li><Link to="/services" className='nav-link'>Services</Link></li>
          <li><Link to="/about" className='nav-link'>About</Link></li>
          <li><Link to="/contact" className='nav-link'>Contact</Link></li>
        </div>
        <div>
          {/* <li><Link to="/adminlogin" className='nav-link'> Admin Login</Link></li> */}
          {/* <li><Link to="/employeelogin" className='nav-link'>Employee Login</Link></li> */}
          <li><Link to="/login" className='nav-link'>Login</Link></li>
          <li><Link to="/register" className='nav-link'>Register</Link></li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;

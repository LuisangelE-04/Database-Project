import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-content">
            <div className="footer-links">
              <span className="footer-titles">This Site</span>
              <nav>
                <ul>
                  <li><a href="/tracking">Tracking</a></li>
                  <li><Link to="/services" className='nav-link'>Services</Link></li>
                  <li><Link to="/about" className='nav-link'>About</Link></li>
                  <li><Link to="/contact" className='nav-link'>Contact</Link></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="footer-content">
            <div className="footer-links">
              <span className="footer-titles">Other Sites</span>
              <nav>
                <ul>
                  <li><a href="/">Post Office Store</a></li>
                  <li><a href="/employee-login">Employee Login</a></li>
                  <li><a href="/admin-login">Manager Login</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="footer-extras">
          <div className="footer-section">
            <p>&copy; 2024 Post Office. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
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
                  <li><a href="#">Services</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="footer-content">
            <div className="footer-links">
              <span className="footer-titles">Other Sites</span>
              <nav>
                <ul>
                  <li><a href="/employeedashboard">Post Office Store</a></li>
                  <li><a href="/employeelogin">Employee Login</a></li>
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
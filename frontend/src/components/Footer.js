import React from 'react';
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
                  <li><a href="#">Tracking</a></li>
                  <li><a href="#">Shipment</a></li>
                  <li><a href="#">About</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="footer-content">
            <div className="footer-links">
              <span className="footer-titles">Other Sites</span>
              <nav>
                <ul>
                  <li><a href="#">Post Office Store</a></li>
                  <li><a href="#">Employee Login</a></li>
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
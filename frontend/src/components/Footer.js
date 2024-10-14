import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <span className="footer-titles">This Site</span>
        <nav>
          <ul>
            <li><a href="">Tracking</a></li>
            <li><a href="">Shipment</a></li>
            <li><a href="">About</a></li>
          </ul>
        </nav>
      </div>
      <div>
      <span className="footer-titles">Other Sites</span>
        <nav>
          <ul>
            <li><a href="">Post Office Store</a></li>
            <li><a href="">Employee Login</a></li>
          </ul>
        </nav>
      </div>
      <div className="footer-content">
        <p>&copy; 2024 Post Office. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
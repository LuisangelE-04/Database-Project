import React from 'react';
import '../css/Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to PostOffice</h1>
        <p>Your reliable courier service</p>
      </header>
      <section className="landing-services">
        <h2>Our Services</h2>
        <div className="service">
          <h3>Mail Delivery</h3>
          <p>Fast and secure mail delivery to your doorstep.</p>
        </div>
        <div className="service">
          <h3>Package Shipping</h3>
          <p>Ship packages of all sizes with ease.</p>
        </div>
        <div className="service">
          <h3>Tracking</h3>
          <p>Track your shipments in real-time.</p>
        </div>
      </section>
      <footer className="landing-footer">
        <p>Contact us: support@postoffice.com</p>
        <p>&copy; 2024 PostOffice. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
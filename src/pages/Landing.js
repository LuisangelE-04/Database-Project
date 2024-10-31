import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/Landing.css';

const LandingPage = () => {
  return (
    <>
    <NavBar />
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to ShipIt!</h1>
        <p>Your Reliable Post Office Service</p>
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
    </div>
    <Footer />
    </>
  );
};

export default LandingPage;
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/Landing.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div className="landing-container">
        <header className="landing-header">
          <h1>Welcome to ShipIt!</h1>
          <p>Your Reliable Post Office Service</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </header>
        <section className="landing-services">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <img src="/delivery.jpg" alt="Mail Delivery" className="service-image" />
              <h3>Mail Delivery</h3>
              <p>Fast and secure mail delivery to your doorstep. Whether it’s local or nationwide, our reliable service ensures your mail gets to where it needs to be on time.</p>
            </div>
            <div className="service-card">
              <img src="/shipping.jpg" alt="Package Shipping" className="service-image" />
              <h3>Package Shipping</h3>
              <p>Ship packages of all sizes with ease. We offer a variety of options to fit your needs, from standard shipping to express and international deliveries.</p>
            </div>
            <div className="service-card">
              <img src="/tracking.jpg" alt="Tracking" className="service-image" />
              <h3>Tracking</h3>
              <p>Track your shipments in real-time. Stay updated with the location and status of your packages using our efficient tracking system.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
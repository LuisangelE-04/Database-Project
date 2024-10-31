import React from 'react';
import '../css/Services.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <>
      <NavBar />
      <div className="services-container">
        <h1>Our Services</h1>
        <div className="services-grid">
          <div className="service-card">
            <h3>Domestic Shipping</h3>
            <p>Fast and reliable shipping across the country.</p>
          </div>
          <div className="service-card">
            <h3>International Shipping</h3>
            <p>Ship packages globally with ease and reliability.</p>
          </div>
          <div className="service-card">
            <h3>Express Shipping</h3>
            <p>Get your packages delivered overnight or within two days.</p>
          </div>
          <div className="service-card">
            <h3>Mail Delivery</h3>
            <p>Deliver letters and small parcels locally or nationwide.</p>
          </div>
          <div className="service-card">
            <h3>Tracking Services</h3>
            <p>Track your shipments in real-time with our tracking tools.</p>
          </div>
          <div className="service-card">
            <h3>Certified Mail</h3>
            <p>Get proof of mailing and delivery for your important items.</p>
          </div>
          <div className="service-card">
            <h3>Freight Shipping</h3>
            <p>Logistics solutions for larger or commercial shipments.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;

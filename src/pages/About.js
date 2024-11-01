import React from 'react';
import '../css/About.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <NavBar />
      <div className="about-container">
        <h1>About ShipIt!</h1>
        <p>Welcome to ShipIt! We are your reliable post office service, committed to delivering packages quickly and securely.</p>

        <h3>Our Mission</h3>
        <p>We strive to provide fast, secure, and affordable shipping solutions to our customers, ensuring satisfaction every step of the way.</p>

        <h3>Our Services</h3>
        <p>We offer a range of services, including package shipping, mail delivery, and tracking services to make sure your shipments are safe and on time.</p>

        <h3>Our History</h3>
        <p>Founded in 2024, ShipIt! has grown to serve customers across the country, providing reliable and efficient postal services.</p>
      </div>
      <Footer />
    </>
  );
};

export default About;

import React from 'react';
import '../css/Contact.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us.</p>
        <h3>Customer Service</h3>
        <p>Phone: 1-800-123-4567</p>
        <p>Email: support@shipit.com</p>

        <h3>Office Locations</h3>
        <p>Headquarters: 123 Main St, Houston, TX</p>

        <h3>Operating Hours</h3>
        <p>Monday - Friday: 9 AM - 5 PM</p>
        <p>Saturday: 10 AM - 2 PM</p>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
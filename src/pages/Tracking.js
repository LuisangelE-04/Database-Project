import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/Tracking.css'; // Import the CSS file

const Tracking = () => {
  return (
    <>
      <NavBar />
      <div className="tracking-container">
        <h1>Track Your Package</h1>
        <form>
          <label htmlFor="trackingNumber">Tracking Number:</label>
          <input type="text" id="trackingNumber" name="trackingNumber" />
          <button type="submit">Track</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Tracking;
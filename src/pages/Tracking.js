import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/Tracking.css';
import { createENDPOINT, ENDPOINTS } from '../endpoints/Endpoints';

const Tracking = () => {
  //const [packageID, setPackageID] = useState('');
  //const [status, setStatus] = useState('');

  const navigate = useNavigate();

  
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
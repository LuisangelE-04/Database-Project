import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/Tracking.css';
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const Tracking = () => {
  const [trackingInfo, setTrackingInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTracking = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found. Redirecting to login.");
        navigate('/login');
        return;
      }

      try {
        const instance = axios.create({
          baseURL: BASE_URL,
          headers: {
            "Content-Type": "application/json",
            authentication: accessToken
          },
        });

        const response = await instance.get(ENDPOINTS.GET.CUSTOMER.TRACKING);
        setTrackingInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tracking information:", error);
        alert("Error fetching tracking information. Please try again.");
      }
    };

    fetchTracking();
  }, [navigate]);

  return (
    <div>
      <NavBar />
      <div className='tracking-container'>
        <h2>Track History</h2>
        <div className='tracking-table'>
          {trackingInfo.map((item, index) => (
            <div key={index} className='tracking-row'>
              <div className='tracking-column'>
                <h3>Package Info</h3>
                <p><strong>Package ID:</strong> {item.packageInfo?.packageId || 'N/A'}</p>
                <p><strong>Amount:</strong> {item.packageInfo?.amount || 'N/A'}</p>
                <p><strong>Shipping Method:</strong> {item.packageInfo?.shippingMethod || 'N/A'}</p>
                <p><strong>Delivery Date:</strong> {item.packageInfo?.deliveryDate.split("T")[0] || 'N/A'}</p>
              </div>
              <div className='tracking-column'>
                <h3>Recipient Address</h3>
                <p><strong>Street:</strong> {item.recepientAddress?.street || 'N/A'}</p>
                <p><strong>City:</strong> {item.recepientAddress?.city || 'N/A'}</p>
                <p><strong>State:</strong> {item.recepientAddress?.state || 'N/A'}</p>
                <p><strong>Zipcode:</strong> {item.recepientAddress?.zipcode || 'N/A'}</p>
              </div>
              <div className='tracking-column'>
                <h3>Sender Address</h3>
                <p><strong>Street:</strong> {item.senderAddress?.street || 'N/A'}</p>
                <p><strong>City:</strong> {item.senderAddress?.city || 'N/A'}</p>
                <p><strong>State:</strong> {item.senderAddress?.state || 'N/A'}</p>
                <p><strong>Zipcode:</strong> {item.senderAddress?.zipcode || 'N/A'}</p>
              </div>
              <div className='tracking-column'>
                <h3>Tracking History</h3>
                {item.trackingHistory.map((history, i) => (
                  <div key={i}>
                    <p><strong>Status:</strong> {history.status}</p>
                    <p><strong>Date:</strong> {history.date}</p>
                    <p><strong>Location:</strong> {history.location}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {trackingInfo.length === 0 && <p>No packages found.</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tracking;

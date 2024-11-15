  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import Footer from "../components/Footer";
  import NavBar from "../components/NavBar";
  import LogOut from "../components/Logout";
  import "../css/CustomerDashboard.css";
  import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";


  const CustomerDashboard = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [recentShipments, setRecentShipments] = useState([]);

    const handleViewAllShipments = () => {
      window.location.href = "/tracking";
    }

    const handleViewSupport = () => {
      window.location.href = "/contact";
    }

    const handleViewProfile = () => {
      window.location.href = "/customer-profile";
    }

    useEffect(() => {
      const fetchData = async () => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          window.location.href = "/login";
          return;
        }
        /*
        try {
          const [profile, packages] = await Promise.all([
            fetch(ENDPOINTS.GET.CUSTOMER.PROFILE),
            fetch(ENDPOINTS.GET.CUSTOMER.TRACKING)
          ])
        }*/

        const profile = axios.create({
          baseURL: BASE_URL,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            authentication: accessToken
          },
        });

        const packages = axios.create({
          baseURL: BASE_URL,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            authentication: accessToken
          }
        })

        const response = await profile.get(ENDPOINTS.GET.CUSTOMER.PROFILE);
        const response2 = await packages.get(ENDPOINTS.GET.CUSTOMER.TRACKING);

        console.log(response.data);
        console.log(response2.data);
        
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setStreet(response.data.address.street);
        setCity(response.data.address.city);
        setState(response.data.address.state);
        setZip(response.data.address.zipCode);
        setPhoneNumber(response.data.phoneNumber);
        setRecentShipments(response2.data);
    };
    
    fetchData();

    }, []);

    return (
      <>
        <NavBar />
        <div className="dashboard-container">
          <header>
            <h1>Welcome back, {firstName}!</h1>
          </header>

          {/*}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="primary-action">Create a Shipment</button>
              <button className="secondary-action">Track a Package</button>
              <button className="secondary-action">Schedule a Pickup</button>
            </div>
          </div>*/}

          {/*
          <div className="shipment-overview">
            <h3>Shipment Overview</h3>
            <div className="overview-cards">
              <div className="card">
                <h4>Active Shipments</h4>
                <p>{activeShipments.length} Active Shipments</p>
              </div>
              <div className="card">
                <h4>Completed Shipments</h4>
                <p>{completedShipments.length} Completed Shipments</p>
              </div>
              <div className="card">
                <h4>Pending Pickups</h4>
                <p>0 Pending Pickups</p> {/* Update this dynamically if needed 
              </div>
            </div>
          </div>*/}

          <div className="recent-shipments">
            <h3>Recent Shipments</h3>
            <div className="shipment-list">
              {recentShipments.length > 0 ? (
                recentShipments.map((shipment, index) => (
                  <div key={index} className="shipment-item">
                    <p><strong>Status:</strong> {shipment.trackingHistory?.[shipment.trackingHistory.length - 1]?.status || "N/A"}</p>
                    <p><strong>Delivery Address:</strong> {shipment.recepientAddress?.street || "N/A"}, {shipment.recepientAddress?.city || "N/A"}, {shipment.recepientAddress?.state || "N/A"} {shipment.recepientAddress?.zipcode || "N/A"}</p>
                    <p><strong>Estimated Delivery:</strong> {shipment.packageInfo?.deliveryDate || "N/A"}</p>
                  </div>
                ))
              ) : (
                <p>No recent shipments.</p>
              )}
              <button className="view-all" onClick={handleViewAllShipments}>View Detailed Shipment Information</button>
            </div>
          </div>

          <div className="profile-info">
            <h3>Your Profile</h3>
            <p><strong>Full Name:</strong> {firstName} {lastName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone Number:</strong> {phoneNumber}</p>
            <p><strong>Address:</strong> {street}, {city} {state}, {zip}</p>
            <button className="view-all" onClick={handleViewProfile}>Edit Profile</button>
          </div>
          
          <div className="support-section">
            <h3>Need Help?</h3>
            <button className="contact-support" onClick={handleViewSupport}>Contact Support</button>
          </div>

          <div className="logout">
            <LogOut />
          </div>
        </div>

        <Footer />
      </>
    )
  };

  export default CustomerDashboard;

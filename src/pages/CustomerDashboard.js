import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import LogOut from "../components/Logout";
import "../css/CustomerDashboard.css";
import { createENDPOINT, ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";


const CustomerDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [activeShipments, setActiveShipments] = useState([]);
  const [completedShipments, setCompletedShipments] = useState([]);
  const [recentShipments, setRecentShipments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });

      const response = await instance.get(ENDPOINTS.GET.CUSTOMER.PROFILE);

      console.log(response.data);
      
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setAddress(response.data.address);
      setStreet(response.data.address.street);
      setCity(response.data.address.city);
      setState(response.data.address.state);
      setZip(response.data.address.zip);
  };
  
  fetchData();

  }, []);

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <header>
          <h1>Welcome back, {firstName}!</h1>
          <h2>Customer Dashboard</h2>
        </header>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="primary-action">Create a Shipment</button>
            <button className="secondary-action">Track a Package</button>
            <button className="secondary-action">Schedule a Pickup</button>
          </div>
        </div>

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
              <p>0 Pending Pickups</p> {/* Update this dynamically if needed */}
            </div>
          </div>
        </div>

        <div className="recent-shipments">
          <h3>Recent Shipments</h3>
          <div className="shipment-list">
            {recentShipments.length > 0 ? (
              recentShipments.map((shipment, index) => (
                <div key={index} className="shipment-item">
                  <p><strong>Shipment ID:</strong> {shipment.id}</p>
                  <p><strong>Status:</strong> {shipment.status}</p>
                  <p><strong>Estimated Delivery:</strong> {shipment.estimatedDelivery}</p>
                </div>
              ))
            ) : (
              <p>No recent shipments.</p>
            )}
            <button className="view-all">View All Shipments</button>
          </div>
        </div>

        <div className="profile-info">
          <h3>Your Profile</h3>
          <p><strong>Full Name:</strong> {firstName} {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone Number:</strong> {phoneNumber}</p>
          <p><strong>Address:</strong></p>
          <p>{street}, {city}, {state} {zip}</p>
        </div>
        <div className="support-section">
          <h3>Need Help?</h3>
          <button className="contact-support">Contact Support</button>
          <a href="/support" className="support-link">Visit Support Center</a>
        </div>

        <div>
          <LogOut />
        </div>
      </div>

      <Footer />
    </>
  )
};

export default CustomerDashboard;

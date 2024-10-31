import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../css/Dashboard.css";

const CustomerDashboard = () => {
  return (
    <>
    <NavBar />
    <div>
      <h1>Customer Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="item-1">
            <h2>My Shipments</h2>
          </div>
          <div className="item-2">
            <h2>Track a Shipment</h2>
          </div>
          <div className="item-3">
            <h2>My Profile</h2>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CustomerDashboard;
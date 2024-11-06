import React, { useState, useEffect } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/Dashboard.css";

const EmployeeDashboard = () => {
  return (
    <>
    <div>
      <NavBar />
    <h1>Manager Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="item-1">
            1
          </div>
          <div className="item-2">
            2
          </div>
          <div className="item-2">
            3
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default EmployeeDashboard;
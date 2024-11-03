import React from "react";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import LogOut from "../components/Logout";
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
        
          </div>
          <div className="item-2">
            <LogOut />
          </div>
          <div className="item-3">

          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CustomerDashboard;
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logout from "../components/Logout";
import "../css/Dashboard.css";
import { ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const EmployeeDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [postOfficeNumber, setPostOfficeNumber] = useState("");
  const [postOfficeEmail, setPostOfficeEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/empolyee-login";
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

      const response = await instance.get(ENDPOINTS.GET.EMPLOYEE.PROFILE);
      console.log(response.data);

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPosition(response.data.position);
      setEmail(response.data.email);
      setPhoneNumber(response.data.phoneNumber);
      setPostOffice(response.data.postOffice.branchName);
      setPostOfficeNumber(response.data.postOffice.phoneNumber);
      setPostOfficeEmail(response.data.postOffice.email);
    };

    fetchData();

  }, []);

  const handleCreatePackage = () => {
    navigate('/create-package');
  }

  const handleUpdatePackage = () => {
    navigate('/update-package');
  }

  const handleViewProfile = () => {
    navigate('/employee-profile');
  }
  
  return (
    <>
    <NavBar />
    <div>
      <div className="branch-info">
        <header>
          <h1>{postOffice}</h1>
          <h3>Contact Your Post Office</h3>
          <p><strong>Phone: </strong>{postOfficeNumber} <strong>Email: </strong>{postOfficeEmail}</p>
        </header>
      </div>
      <header>
        <h1>Hello, {firstName}! | {position}</h1>
      </header>

      <div className="dashboard-container">
        <div className="profile-info">
          <header>
            <h3>Account Information</h3>
          </header>
          <p><strong>Full Name: </strong>{firstName} {lastname}</p>
          <p><strong>Position: </strong>{position}</p>
          <p><strong>Your Email:  </strong>{email}</p>
          <p><strong>Phone: </strong>{phoneNumber}</p>
          <button className="view-all" onClick={handleViewProfile}>Edit Profile</button>
        </div>

        <div className="quick-actions">
          <header>
            <h3>Quick Actions</h3>
          </header>
          <div className="dashboard-grid">
            <div className="item-1">
              <button onClick={handleUpdatePackage}>Update Package</button>
            </div>
            <div className="item-2">
              <button onClick={handleCreatePackage}>Create Package</button>
            </div>
          </div>
        </div>

        <div className="logout">
          <Logout />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default EmployeeDashboard;

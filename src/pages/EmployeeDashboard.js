import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logout from "../components/Logout";
import CreatePackage from "../components/CreatePackage";
import "../css/Dashboard.css";
import { createENDPOINT, ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const EmployeeDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
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
  
  return (
    <>
    <NavBar />
    <div>
      <div className="branch-info">
        <h1>{postOffice}</h1>
        <h3>Contact Your Post Office</h3>
        <p><strong>Phone: </strong>{postOfficeNumber} <strong>Email: </strong>{postOfficeEmail}</p>
      </div>
      <h1>Hello, {firstName}! | {position}</h1>
      <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="item-1">
            <button onClick={handleUpdatePackage}>Update Package</button>
          </div>
          <div className="item-2">
            <button onClick={handleCreatePackage}>Create Package</button>
          </div>
          <div className="item-2">
            <button>Edit Profile</button>
          </div>
        </div>
        <Logout />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default EmployeeDashboard;
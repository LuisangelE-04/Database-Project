import React, { useState, useEffect } from 'react';
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Logout from "../components/Logout";
import CreatePackage from "../components/CreatePackage";
import "../css/Dashboard.css";
import { createENDPOINT, ENDPOINTS, BASE_URL } from "../endpoints/Endpoints";

const EmployeeDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [postOffice, setPostOffice] = useState("");

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
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });

      const response = await instance.get(ENDPOINTS.GET.EMPLOYEE.PROFILE);

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setPostOffice(response.data.postOffice.branchName);
    };

    fetchData();

  }, []);
  
  return (
    <>
    <NavBar />
    <div>
      <h1>Hello, {firstName}!</h1>
      <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="item-1">
          <Logout />
          </div>
          <div className="item-2">
            <h1>Create New Package</h1>
            <div className="form-container">
              <CreatePackage />
            </div>
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
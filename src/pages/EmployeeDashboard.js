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
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [postOffice, setPostOffice] = useState({ branchId: "", phoneNumber: "" });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        window.location.href = "/employee-login";
        return;
      }
  
      const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
          authentication: accessToken
        },
      });
  
      try {
        const response = await instance.get(ENDPOINTS.GET.EMPLOYEE.PROFILE);
  
        console.log("Response data:", response.data);  
        setFirstName(response.data.firstName || "N/A");
        setLastName(response.data.lastName || "N/A");
        setEmail(response.data.email || "N/A");
        setEmployeeId(response.data.employeeId || "N/A");
        setPhoneNumber(response.data.phoneNumber || "N/A");
        setPosition(response.data.position || "N/A");
  
        const postOfficeData = response.data.postOffice;
        setPostOffice({
          branchId: postOfficeData?.branchId || "N/A",
          phoneNumber: postOfficeData?.phoneNumber || "N/A",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Hello, {firstName} {lastName}!</h1>
        <p><strong>Employee ID:</strong> {employeeId}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Position:</strong> {position}</p>

        <div className="post-office-details">
          <h2>Post Office Details</h2>
          <p><strong>Branch ID:</strong> {postOffice.branchId}</p>
          <p><strong>Phone Number:</strong> {postOffice.phoneNumber}</p>
        </div>

        <div className="dashboard-grid">
          <div className="item-1">
            <button onClick={() => navigate("/employee/create-package")}>
              Create Package
            </button>
          </div>
          
          <div className="item-2">
            <button onClick={() => navigate("/employee/update-profile")}>
              Update Profile
            </button>
          </div>
          
          <div className="item-3">
            <button onClick={() => navigate("/employee/update-package")}>
              Update Package
            </button>
          </div>
        </div>

        <Logout />
      </div>
      <Footer />
    </>
  );
};

export default EmployeeDashboard;

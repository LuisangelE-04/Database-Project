import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, BASE_URL } from '../endpoints/Endpoints';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const EmployeeReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchEmployeeReport = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found. Redirecting to login.");
        window.location.href = '/admin-login';
        return;
      }

      try {
        const instance = axios.create({
          baseURL: BASE_URL,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            authentication: accessToken
          },
        });

        const response = await instance.get(ENDPOINTS.AUTH.MANAGER.EMPLOYEE_REPORT);
        setReportData(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("Error fetching tracking information:", error);
        alert("Error fetching tracking information. Please try again.");
      }
    };

    fetchEmployeeReport();
  },[]);

  return (
    <div>
      <NavBar />
      <div className='report-container'>
        <h2>Employee Login Report</h2>

        
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeReport;
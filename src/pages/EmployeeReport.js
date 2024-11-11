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

        {reportData ? (
          <div className='report-table'>
            {/* Display post office information */}
            <div className='report-row'>
              <div className='report-column'>
                <h3>Post Office Info</h3>
                <p><strong>Branch Name:</strong> {reportData.postOfficeInfo?.branchName || 'N/A'}</p>
                <p><strong>Branch ID:</strong> {reportData.postOfficeInfo?.branchId || 'N/A'}</p>
                <p><strong>Address:</strong> {`${reportData.postOfficeInfo?.address.street || 'N/A'}, ${reportData.postOfficeInfo?.address.city || 'N/A'}, ${reportData.postOfficeInfo?.address.state || 'N/A'} ${reportData.postOfficeInfo?.address.zipcode || 'N/A'}`}</p>
              </div>
            </div>

            {/* Table for employee data */}
            <table className='employee-report-table'>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Position</th>
                  <th>Recent Logins</th>
                </tr>
              </thead>
              <tbody>
                {reportData.employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.employeeInfo?.name || 'N/A'}</td>
                    <td>{employee.employeeInfo?.position || 'N/A'}</td>
                    <td>
                      {employee.recentLogins.length > 0 ? (
                        employee.recentLogins.map((login, i) => (
                          <div key={i} className='login-entry'>
                            <p><strong>Date:</strong> {login.date}</p>
                            <p><strong>Location:</strong> {login.location}</p>
                          </div>
                        ))
                      ) : (
                        <p>No recent logins</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {reportData.employees.length === 0 && <p>No employees found.</p>}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeReport;